/* is-cool-me — Tool Functions */
(function () {
  'use strict';

  /* ── Helpers ── */
  const el = (id) => document.getElementById(id);
  const setResult = (html) => {
    const r = el('tool-result');
    if (r) r.innerHTML = html;
  };
  const setLoading = (msg) => setResult('<span style="color:var(--color-accent-light)">' + (msg || 'Loading...') + '</span>');
  const setError = (msg) => setResult('<span style="color:#ef4444">' + msg + '</span>');
  const corsProxy = (url) => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  const dnsApi = (name, type) => 'https://dns.google/resolve?name=' + encodeURIComponent(name) + '&type=' + encodeURIComponent(type);
  const showTool = (id) => {
    const s = el(id);
    if (s) s.style.display = 'block';
  };

  function escapeHtml(t) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(t));
    return d.innerHTML;
  }

  /* ── DNS Checker ── */
  window.checkDNS = function () {
    var domain = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!domain) { setError('Please enter a domain name.'); return; }
    var type = (el('dns-record-type') ? el('dns-record-type').value : 'A') || 'A';
    setLoading('Looking up ' + type + ' records for ' + escapeHtml(domain) + '...');

    var types = type === 'ALL' ? ['A','AAAA','CNAME','MX','TXT','NS'] : [type];
    var promises = types.map(function (t) {
      return fetch(dnsApi(domain, t))
        .then(function (r) { return r.json(); })
        .then(function (d) { return { type: t, data: d }; })
        .catch(function () { return { type: t, data: null }; });
    });

    Promise.all(promises).then(function (results) {
      var html = '';
      results.forEach(function (r) {
        if (!r.data || r.data.Status !== 0) {
          html += '<div style="margin-bottom:.75rem;padding:.5rem;border-left:3px solid var(--color-border);"><strong style="color:var(--color-accent-light)">' + r.type + '</strong>: Query failed or domain not found</div>';
          return;
        }
        var answers = r.data.Answer || [];
        if (answers.length === 0) {
          html += '<div style="margin-bottom:.75rem;padding:.5rem;border-left:3px solid var(--color-border);"><strong style="color:var(--color-accent-light)">' + r.type + '</strong>: No records found</div>';
          return;
        }
        html += '<div style="margin-bottom:.75rem;padding:.5rem;border-left:3px solid var(--color-accent);"><strong style="color:var(--color-accent-light)">' + r.type + '</strong> (' + answers.length + ' records)<br>';
        answers.forEach(function (a) {
          html += '<span style="color:var(--color-text-muted);font-size:.8rem;">TTL ' + a.TTL + 's</span> → ' + escapeHtml(a.data) + '<br>';
        });
        html += '</div>';
      });
      setResult(html || '<span style="color:var(--color-text-muted)">No results found for ' + escapeHtml(domain) + '</span>');
    }).catch(function () {
      setError('DNS lookup failed. Check your connection and try again.');
    });
  };

  /* ── SSL Checker ── */
  window.checkSSL = function () {
    var url = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!url) { setError('Please enter a URL.'); return; }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    setLoading('Checking SSL for ' + escapeHtml(url) + '...');

    fetch(corsProxy(url))
      .then(function (r) {
        var headers = {};
        r.headers.forEach(function (v, k) { headers[k] = v; });
        var details = { url: r.url, status: r.status, headers: headers, ok: r.ok, redirected: r.redirected, type: r.type };
        return details;
      })
      .then(function (details) {
        var html = '';
        html += '<div style="margin-bottom:.5rem;padding:.5rem;border-left:3px solid var(--color-accent);">';
        html += '<div><strong>URL:</strong> ' + escapeHtml(details.url) + '</div>';
        html += '<div><strong>Status:</strong> ' + details.status + ' ' + (details.ok ? '<span style="color:#22c55e">OK</span>' : '<span style="color:#ef4444">Error</span>') + '</div>';
        html += '<div><strong>Redirected:</strong> ' + (details.redirected ? 'Yes' : 'No') + '</div>';
        html += '<div><strong>TLS:</strong> ' + (details.url.indexOf('https') === 0 ? '<span style="color:#22c55e">Enabled</span>' : '<span style="color:#ef4444">Not HTTPS</span>') + '</div>';

        var h2 = details.headers['x-oss'] || details.headers['server'] || '—';
        html += '<div><strong>Server:</strong> ' + escapeHtml(h2) + '</div>';
        html += '</div>';
        html += '<details style="margin-top:.5rem;cursor:pointer;font-size:.8rem;"><summary style="color:var(--color-accent-light)">Full Response Headers</summary><div style="margin-top:.5rem;background:var(--color-bg);padding:.75rem;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:.75rem;word-break:break-all;">';
        for (var k in details.headers) {
          if (details.headers.hasOwnProperty(k)) {
            html += '<span style="color:var(--color-accent-light)">' + escapeHtml(k) + '</span>: ' + escapeHtml(details.headers[k]) + '<br>';
          }
        }
        html += '</div></details>';

        html += '<div style="margin-top:.5rem;padding:.5rem;font-size:.8rem;color:var(--color-text-muted);">';
        html += 'Note: For full SSL certificate details (issuer, expiry, cipher), use a dedicated SSL test service.';
        html += '</div>';

        setResult(html);
      })
      .catch(function () {
        setError('Could not fetch ' + escapeHtml(url) + '. The CORS proxy may be rate-limited or the site blocks it.');
      });
  };

  /* ── Robots.txt Generator ── */
  window.generateRobotsTxt = function () {
    var ua = el('rt-user-agent') ? el('rt-user-agent').value.trim() : '';
    var allow = el('rt-allow') ? el('rt-allow').value.trim() : '';
    var disallow = el('rt-disallow') ? el('rt-disallow').value.trim() : '';
    var sitemap = el('rt-sitemap') ? el('rt-sitemap').value.trim() : '';

    if (!ua) { setError('Please enter at least a User-agent directive.'); return; }

    var lines = [];
    lines.push('User-agent: ' + ua);
    if (allow) lines.push('Allow: ' + allow);
    if (disallow) lines.push('Disallow: ' + disallow);
    if (sitemap) lines.push('');
    if (sitemap) lines.push('Sitemap: ' + sitemap);

    var content = lines.join('\n');
    var html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Generated robots.txt</strong></div>';
    html += '<textarea readonly style="width:100%;min-height:120px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;color:var(--color-text);font-family:var(--font-mono);font-size:.8rem;">' + escapeHtml(content) + '</textarea>';
    html += '<div style="margin-top:.5rem;">';
    html += '<button onclick="copyResult(\'' + escapeHtml(content.replace(/'/g, "\\'")) + '\')" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy to Clipboard</button>';
    html += '</div>';
    setResult(html);
  };

  /* ── Sitemap Validator ── */
  window.validateSitemap = function () {
    var xml = el('sitemap-input') ? el('sitemap-input').value.trim() : '';
    if (!xml) { setError('Please paste your sitemap XML content.'); return; }

    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, 'text/xml');
    var parseError = doc.querySelector('parsererror');

    if (parseError) {
      setResult('<div style="padding:.5rem;border-left:3px solid #ef4444;"><strong style="color:#ef4444">XML Error:</strong><br>' + escapeHtml(parseError.textContent) + '</div>');
      return;
    }

    var urlset = doc.documentElement;
    var tagName = urlset ? urlset.tagName : '';

    if (tagName !== 'urlset' && tagName !== 'sitemapindex') {
      setResult('<div style="padding:.5rem;border-left:3px solid #ef4444;"><strong style="color:#ef4444">Invalid Sitemap:</strong> Root element must be &lt;urlset&gt; or &lt;sitemapindex&gt;, got &lt;' + escapeHtml(tagName) + '&gt;</div>');
      return;
    }

    var urls = urlset.querySelectorAll('loc');
    var issues = [];
    var validCount = 0;

    urls.forEach(function (loc) {
      var text = loc.textContent.trim();
      if (!text) {
        issues.push('Empty <loc> element found');
        return;
      }
      if (!/^https?:\/\//i.test(text)) {
        issues.push('URL does not start with http(s): ' + escapeHtml(text));
      }
      validCount++;
    });

    var html = '<div style="margin-bottom:.5rem;">';
    html += '<strong style="color:var(--color-accent-light)">Sitemap Validation Results</strong>';
    html += '</div>';
    html += '<div style="padding:.5rem;border-left:3px solid var(--color-accent);margin-bottom:.5rem;">';
    html += '<strong>Root:</strong> &lt;' + escapeHtml(tagName) + '&gt;<br>';
    html += '<strong>URLs found:</strong> ' + validCount + '<br>';
    html += '<strong>Issues:</strong> ' + issues.length;
    html += '</div>';

    if (issues.length > 0) {
      html += '<div style="margin-top:.5rem;">';
      issues.forEach(function (issue) {
        html += '<div style="padding:.25rem .5rem;border-left:3px solid #f59e0b;font-size:.85rem;margin-bottom:.25rem;">' + issue + '</div>';
      });
      html += '</div>';
    }

    if (validCount === 0 && issues.length === 0) {
      html += '<div style="padding:.5rem;border-left:3px solid #f59e0b;">No <loc> elements found. Your sitemap appears empty.</div>';
    } else if (issues.length === 0) {
      html += '<div style="padding:.5rem;border-left:3px solid #22c55e;"><span style="color:#22c55e">✓</span> All URLs look valid!</div>';
    }

    setResult(html);
  };

  /* ── OpenGraph Preview ── */
  window.checkOG = function () {
    var url = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!url) { setError('Please enter a URL.'); return; }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    setLoading('Fetching OG data from ' + escapeHtml(url) + '...');

    fetch(corsProxy(url))
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var metas = doc.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
        var ogData = {};

        metas.forEach(function (m) {
          var key = m.getAttribute('property') || m.getAttribute('name') || '';
          var val = m.getAttribute('content') || '';
          if (key && val) ogData[key] = val;
        });

        var title = ogData['og:title'] || ogData['twitter:title'] || doc.title || 'No title';
        var desc = ogData['og:description'] || ogData['twitter:description'] || 'No description';
        var image = ogData['og:image'] || ogData['twitter:image'] || '';
        var siteName = ogData['og:site_name'] || '';
        var type = ogData['og:type'] || 'website';

        var resultHtml = '';

        if (image) {
          resultHtml += '<div style="margin-bottom:.75rem;border-radius:var(--radius-md);overflow:hidden;max-width:400px;"><img src="' + escapeHtml(image) + '" alt="OG Preview" style="width:100%;display:block;" onerror="this.parentElement.style.display=\'none\'" /></div>';
        }

        resultHtml += '<div style="padding:.75rem;background:var(--color-bg);border-radius:var(--radius-md);border:1px solid var(--color-border);margin-bottom:.75rem;">';
        resultHtml += '<div style="font-size:.7rem;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.25rem;">' + escapeHtml(siteName || type) + '</div>';
        resultHtml += '<div style="font-weight:600;font-size:1rem;margin-bottom:.25rem;color:var(--color-text);">' + escapeHtml(title) + '</div>';
        resultHtml += '<div style="font-size:.85rem;color:var(--color-text-muted);">' + escapeHtml(desc) + '</div>';
        resultHtml += '</div>';

        resultHtml += '<details style="margin-top:.5rem;cursor:pointer;font-size:.8rem;"><summary style="color:var(--color-accent-light)">All Meta Tags</summary><div style="margin-top:.5rem;background:var(--color-bg);padding:.75rem;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:.75rem;word-break:break-all;">';
        for (var k in ogData) {
          if (ogData.hasOwnProperty(k)) {
            resultHtml += '<span style="color:var(--color-accent-light)">' + escapeHtml(k) + '</span>: ' + escapeHtml(ogData[k]) + '<br>';
          }
        }
        if (Object.keys(ogData).length === 0) {
          resultHtml += '<span style="color:var(--color-text-muted)">No Open Graph tags found on this page.</span>';
        }
        resultHtml += '</div></details>';

        setResult(resultHtml);
      })
      .catch(function () {
        setError('Could not fetch ' + escapeHtml(url) + '. The CORS proxy may be rate-limited or the site blocks it.');
      });
  };

  /* ── Meta Tag Generator ── */
  window.generateMeta = function () {
    var mTitle = el('meta-title') ? el('meta-title').value.trim() : '';
    var mDesc = el('meta-desc') ? el('meta-desc').value.trim() : '';
    var mImage = el('meta-image') ? el('meta-image').value.trim() : '';
    var mUrl = el('meta-url') ? el('meta-url').value.trim() : '';
    var mSiteName = el('meta-sitename') ? el('meta-sitename').value.trim() : '';

    if (!mTitle) { setError('Please enter at least a page title.'); return; }
    if (!mDesc) { setError('Please enter a meta description.'); return; }

    var lines = [];
    lines.push('<!-- Primary Meta Tags -->');
    lines.push('<meta name="title" content="' + escapeHtml(mTitle) + '" />');
    lines.push('<meta name="description" content="' + escapeHtml(mDesc) + '" />');
    if (mUrl) lines.push('<link rel="canonical" href="' + escapeHtml(mUrl) + '" />');

    lines.push('');
    lines.push('<!-- Open Graph / Facebook -->');
    lines.push('<meta property="og:type" content="website" />');
    if (mUrl) lines.push('<meta property="og:url" content="' + escapeHtml(mUrl) + '" />');
    lines.push('<meta property="og:title" content="' + escapeHtml(mTitle) + '" />');
    lines.push('<meta property="og:description" content="' + escapeHtml(mDesc) + '" />');
    if (mImage) lines.push('<meta property="og:image" content="' + escapeHtml(mImage) + '" />');
    if (mSiteName) lines.push('<meta property="og:site_name" content="' + escapeHtml(mSiteName) + '" />');

    lines.push('');
    lines.push('<!-- Twitter -->');
    lines.push('<meta name="twitter:card" content="summary_large_image" />');
    lines.push('<meta name="twitter:title" content="' + escapeHtml(mTitle) + '" />');
    lines.push('<meta name="twitter:description" content="' + escapeHtml(mDesc) + '" />');
    if (mImage) lines.push('<meta name="twitter:image" content="' + escapeHtml(mImage) + '" />');

    var content = lines.join('\n');
    var html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Generated Meta Tags</strong></div>';
    html += '<textarea readonly style="width:100%;min-height:180px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;color:var(--color-text);font-family:var(--font-mono);font-size:.8rem;">' + escapeHtml(content) + '</textarea>';
    html += '<div style="margin-top:.5rem;">';
    html += '<button onclick="copyResult(\'' + escapeHtml(content.replace(/'/g, "\\'")) + '\')" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy to Clipboard</button>';
    html += '</div>';
    setResult(html);
  };

  /* ── CNAME Validator ── */
  window.checkCNAME = function () {
    var domain = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!domain) { setError('Please enter a domain name.'); return; }
    setLoading('Looking up CNAME for ' + escapeHtml(domain) + '...');

    fetch(dnsApi(domain, 'CNAME'))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.Status !== 0 || !d.Answer || d.Answer.length === 0) {
          setResult('<div style="padding:.5rem;border-left:3px solid #f59e0b;"><strong style="color:#f59e0b">No CNAME record</strong> found for <strong>' + escapeHtml(domain) + '</strong>.<br>It may use A/AAAA records instead, or the domain may not exist.</div>');
          return;
        }
        var cname = d.Answer[0].data;
        var ttl = d.Answer[0].TTL;
        var html = '<div style="padding:.5rem;border-left:3px solid var(--color-accent);">';
        html += '<strong style="color:var(--color-accent-light)">CNAME Record Found</strong><br>';
        html += '<strong>' + escapeHtml(domain) + '</strong> → <strong>' + escapeHtml(cname) + '</strong><br>';
        html += '<span style="color:var(--color-text-muted);font-size:.85rem;">TTL: ' + ttl + 's</span>';
        html += '</div>';
        setResult(html);
      })
      .catch(function () {
        setError('CNAME lookup failed. Check your connection and try again.');
      });
  };

  /* ── JSON Formatter ── */
  window.formatJSON = function () {
    var input = el('json-input') ? el('json-input').value.trim() : '';
    if (!input) { setError('Please enter JSON to format.'); return; }
    try {
      var parsed = JSON.parse(input);
      var formatted = JSON.stringify(parsed, null, 2);
      var html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Valid JSON</strong> <span style="color:#22c55e">✓</span></div>';
      html += '<textarea readonly style="width:100%;min-height:150px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;color:var(--color-text);font-family:var(--font-mono);font-size:.8rem;">' + escapeHtml(formatted) + '</textarea>';
      html += '<div style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap;">';
      html += '<button onclick="copyResult(\'' + escapeHtml(formatted.replace(/'/g, "\\'")) + '\')" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy</button>';
      html += '<button onclick="minifyJSON()" style="padding:.5rem 1rem;background:var(--color-card);color:var(--color-text);border:1px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Minify</button>';
      html += '</div>';
      setResult(html);
    } catch (e) {
      setResult('<div style="padding:.5rem;border-left:3px solid #ef4444;"><strong style="color:#ef4444">Invalid JSON</strong><br>' + escapeHtml(e.message) + '</div>');
    }
  };

  window.minifyJSON = function () {
    var input = el('json-input') ? el('json-input').value.trim() : '';
    if (!input) { setError('Please enter JSON to minify.'); return; }
    try {
      var parsed = JSON.parse(input);
      var minified = JSON.stringify(parsed);
      var html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Minified JSON</strong></div>';
      html += '<textarea readonly style="width:100%;min-height:80px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;color:var(--color-text);font-family:var(--font-mono);font-size:.8rem;">' + escapeHtml(minified) + '</textarea>';
      html += '<div style="margin-top:.5rem;"><button onclick="copyResult(\'' + escapeHtml(minified.replace(/'/g, "\\'")) + '\')" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy</button></div>';
      setResult(html);
    } catch (e) {
      setError('Invalid JSON: ' + escapeHtml(e.message));
    }
  };

  /* ── Base64 Encoder/Decoder ── */
  window.encodeBase64 = function () {
    var input = el('b64-input') ? el('b64-input').value : '';
    if (!input) { setError('Please enter text to encode.'); return; }
    try {
      var encoded = btoa(unescape(encodeURIComponent(input)));
      var html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Encoded (Base64)</strong></div>';
      html += '<textarea readonly style="width:100%;min-height:80px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;color:var(--color-text);font-family:var(--font-mono);font-size:.8rem;">' + escapeHtml(encoded) + '</textarea>';
      html += '<div style="margin-top:.5rem;"><button onclick="copyResult(\'' + escapeHtml(encoded.replace(/'/g, "\\'")) + '\')" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy</button></div>';
      setResult(html);
    } catch (e) {
      setError('Encoding failed: ' + escapeHtml(e.message));
    }
  };

  window.decodeBase64 = function () {
    var input = el('b64-input') ? el('b64-input').value : '';
    if (!input) { setError('Please enter Base64 to decode.'); return; }
    try {
      var decoded = decodeURIComponent(escape(atob(input)));
      var html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Decoded</strong></div>';
      html += '<textarea readonly style="width:100%;min-height:80px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;color:var(--color-text);font-family:var(--font-mono);font-size:.8rem;">' + escapeHtml(decoded) + '</textarea>';
      html += '<div style="margin-top:.5rem;"><button onclick="copyResultText(\'' + escapeHtml(decoded.replace(/'/g, "\\'")) + '\')" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy</button></div>';
      setResult(html);
    } catch (e) {
      setError('Invalid Base64 string. Please check your input.');
    }
  };

  /* ── HTTP Headers Checker ── */
  window.checkHeaders = function () {
    var url = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!url) { setError('Please enter a URL.'); return; }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    setLoading('Fetching headers for ' + escapeHtml(url) + '...');

    fetch(corsProxy(url))
      .then(function (r) {
        var headers = {};
        r.headers.forEach(function (v, k) { headers[k] = v; });
        return { status: r.status, statusText: r.statusText, headers: headers };
      })
      .then(function (details) {
        var html = '<div style="margin-bottom:.5rem;padding:.5rem;border-left:3px solid var(--color-accent);">';
        html += '<strong>' + details.status + ' ' + escapeHtml(details.statusText) + '</strong>';
        html += '</div>';
        html += '<div style="background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:.75rem;font-family:var(--font-mono);font-size:.75rem;word-break:break-all;">';
        for (var k in details.headers) {
          if (details.headers.hasOwnProperty(k)) {
            html += '<span style="color:var(--color-accent-light)">' + escapeHtml(k) + '</span>: ' + escapeHtml(details.headers[k]) + '<br>';
          }
        }
        html += '</div>';
        setResult(html);
      })
      .catch(function () {
        setError('Could not fetch ' + escapeHtml(url) + '. The CORS proxy may be rate-limited or the site blocks it.');
      });
  };

  /* ── IP Lookup ── */
  window.lookupIP = function () {
    var input = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!input) { setError('Please enter an IP address or domain.'); return; }
    setLoading('Looking up ' + escapeHtml(input) + '...');

    var isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input);
    var queryParam = isIP ? input : '';

    var ipPromise;
    if (isIP) {
      ipPromise = Promise.resolve(input);
    } else {
      ipPromise = fetch(dnsApi(input, 'A'))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.Answer && d.Answer.length > 0) return d.Answer[0].data;
          throw new Error('No A record found');
        })
        .catch(function () { return ''; });
    }

    ipPromise.then(function (ip) {
      if (!ip) {
        setResult('<div style="padding:.5rem;border-left:3px solid #f59e0b;">Could not resolve ' + escapeHtml(input) + ' to an IP address.</div>');
        return;
      }

      fetch('https://ipapi.co/' + ip + '/json/')
        .then(function (r) {
          if (!r.ok) throw new Error('API error');
          return r.json();
        })
        .then(function (data) {
          var html = '<div style="padding:.5rem;border-left:3px solid var(--color-accent);">';
          html += '<strong style="color:var(--color-accent-light)">' + escapeHtml(ip) + '</strong><br>';
          if (!isIP) html += '<span style="color:var(--color-text-muted);font-size:.85rem;">Resolved from ' + escapeHtml(input) + '</span><br>';
          if (data.city) html += '📍 ' + escapeHtml(data.city) + ', ' + escapeHtml(data.region || '') + ', ' + escapeHtml(data.country_name || '') + '<br>';
          if (data.org) html += '🏢 ' + escapeHtml(data.org) + '<br>';
          if (data.asn) html += '🔗 AS' + data.asn + '<br>';
          if (data.latitude && data.longitude) html += '🌐 ' + data.latitude + ', ' + data.longitude + '<br>';
          html += '</div>';
          setResult(html);
        })
        .catch(function () {
          var fallbackHtml = '<div style="padding:.5rem;border-left:3px solid var(--color-accent);">';
          fallbackHtml += '<strong style="color:var(--color-accent-light)">' + escapeHtml(ip) + '</strong><br>';
          if (!isIP) fallbackHtml += '<span style="color:var(--color-text-muted);font-size:.85rem;">Resolved from ' + escapeHtml(input) + '</span><br>';
          fallbackHtml += '<span style="color:var(--color-text-muted);font-size:.85rem;">Geolocation data unavailable (API rate limit may apply)</span>';
          fallbackHtml += '</div>';
          setResult(fallbackHtml);
        });
    });
  };

  /* ── Subdomain Finder ── */
  window.findSubdomains = function () {
    var domain = el('tool-input') ? el('tool-input').value.trim() : '';
    if (!domain) { setError('Please enter a domain name.'); return; }

    var common = [
      'www', 'mail', 'ftp', 'admin', 'blog', 'shop', 'api', 'dev', 'test',
      'staging', 'cdn', 'm', 'app', 'beta', 'demo', 'forum', 'docs', 'wiki',
      'status', 'support', 'help', 'community', 'portal', 'webmail', 'cpanel',
      'whm', 'ns1', 'ns2', 'ns3', 'server', 'git', 'jenkins', 'jira', 'confluence',
      'smtp', 'pop3', 'imap', 'vpn', 'remote', 'dash', 'dashboard', 'monitor',
      'analytics', 'tracking', 'static', 'assets', 'media', 'images', 'files',
      'upload', 'download', 'cloud', 'backup', 'proxy', 'gateway', 'auth',
      'login', 'register', 'signup', 'my', 'account', 'profile', 'user'
    ];

    setLoading('Checking ' + common.length + ' common subdomains for ' + escapeHtml(domain) + '...');

    var found = [];
    var checked = 0;

    function checkNext() {
      if (checked >= common.length) {
        var html = '';
        if (found.length === 0) {
          html = '<div style="padding:.5rem;border-left:3px solid #f59e0b;">No common subdomains found for ' + escapeHtml(domain) + '.</div>';
        } else {
          html = '<div style="margin-bottom:.5rem;"><strong style="color:var(--color-accent-light)">Found ' + found.length + ' subdomains</strong></div>';
          found.forEach(function (sd) {
            html += '<div style="padding:.35rem .5rem;border-left:3px solid var(--color-accent);margin-bottom:.25rem;font-family:var(--font-mono);font-size:.85rem;">' + escapeHtml(sd.sub) + '.' + escapeHtml(domain) + ' → <span style="color:var(--color-text-muted);font-size:.8rem;">' + escapeHtml(sd.ip || sd.data || '') + '</span></div>';
          });
        }
        html += '<div style="margin-top:.5rem;font-size:.8rem;color:var(--color-text-muted);">Checked ' + common.length + ' common subdomain names.</div>';
        setResult(html);
        return;
      }

      var sub = common[checked++];
      var fqdn = sub + '.' + domain;

      fetch(dnsApi(fqdn, 'A'))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.Status === 0 && d.Answer && d.Answer.length > 0) {
            found.push({ sub: sub, ip: d.Answer[0].data });
          }
        })
        .catch(function () {})
        .then(function () {
          setTimeout(checkNext, 50);
        });
    }

    checkNext();
  };

  /* ── Copy helper ── */
  window.copyResult = function (text) {
    navigator.clipboard.writeText(text).then(function () {
      setResult('<div style="padding:.5rem;border-left:3px solid #22c55e;"><span style="color:#22c55e">✓</span> Copied to clipboard!</div>');
    }).catch(function () {
      setError('Failed to copy. Try selecting the text manually.');
    });
  };

  window.copyResultText = window.copyResult;

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var input = el('tool-input');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var btn = input.parentElement.querySelector('button');
          if (btn && btn.onclick) btn.click();
        }
      });
    }
  });

})();
