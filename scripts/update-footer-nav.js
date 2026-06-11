import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const SITE_ROOT = '/home/ubuntu/is-pro.dev';

const OLD_SIMPLE_FOOTER = `<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="/" class="footer-logo" aria-label="is-cool-me home">
          <img src="/dist/images/logo.png" alt="" width="28" height="28" aria-hidden="true" />
          <span>is-cool-me</span>
        </a>
        <p class="footer-tagline">Free subdomains for developers.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="/">Home</a>
        <a href="/domains/">Domains</a>
        <a href="/blog/">Blog</a>
        <a href="/guides/">Guides</a>
        <a href="/tools/">Tools</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
      </nav>
      <p class="footer-copyright">&copy; 2026 is-cool-me. All rights reserved.</p>
    </div>
  </div>
</footer>`;

const NEW_FOOTER = `<footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-migration-note">
          &#x1F504; <strong>Migration note:</strong> is-cool-me is the project
          operating subdomains on <code>is-pro.dev</code> and
          <code>is-into.tech</code>. <code>is-cool.me</code> subdomains migrated
          to <code>is-pro.dev</code>, and <code>is-app.tech</code> migrated to
          <code>is-into.tech</code>.
        </div>
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" class="footer-logo-link">
              <img src="/dist/images/logo.png" alt="" width="28" height="28" aria-hidden="true" />
              <span class="mono">is-cool-me</span>
            </a>
            <p class="footer-tagline">Free subdomains for developers with GitHub sign-in, DNS management, and community support.</p>
            <a href="https://discord.gg/N8YzrkJxYy" class="btn btn-outline btn-sm btn-fit" target="_blank" rel="noopener noreferrer">Join Discord</a>
          </div>
          <div class="footer-col">
            <h4>Service</h4>
            <nav class="footer-links" aria-label="Service links">
              <a href="https://dash.is-pro.dev" class="footer-link" target="_blank" rel="noopener noreferrer">Dashboard</a>
              <a href="/domains/" class="footer-link">Domains</a>
              <a href="/blog/" class="footer-link">Blog</a>
              <a href="/guides/" class="footer-link">Guides</a>
              <a href="/showcase/" class="footer-link">Showcase</a>
              <a href="/trending/" class="footer-link">Trending</a>
              <a href="/tools/" class="footer-link">Tools</a>
              <a href="/compare/" class="footer-link">Compare</a>
              <a href="/tutorials/" class="footer-link">Tutorials</a>
              <a href="/about/" class="footer-link">About</a>
              <a href="/contact/" class="footer-link">Contact</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <nav class="footer-links" aria-label="Legal links">
              <a href="/terms/" class="footer-link">Terms of Service</a>
              <a href="/privacy/" class="footer-link">Privacy Policy</a>
              <a href="/editorial-standards/" class="footer-link">Editorial Standards</a>
              <a href="/abuse-report/" class="footer-link">Abuse Report</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>Community</h4>
            <nav class="footer-links" aria-label="Community links">
              <a href="https://discord.gg/N8YzrkJxYy" class="footer-link" target="_blank" rel="noopener noreferrer">Discord Server</a>
              <a href="https://github.com/is-cool-me" class="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; 2026 is-cool-me. All rights reserved.</span>
          <div class="footer-inline-links">
            <a href="/about/">About</a>
            <a href="/terms/">Terms</a>
            <a href="/privacy/">Privacy</a>
            <a href="/editorial-standards/">Editorial Standards</a>
            <a href="/abuse-report/">Abuse Report</a>
            <a href="/blog/">Blog</a>
            <a href="/guides/">Guides</a>
            <a href="/tools/">Tools</a>
            <a href="/contact/">Contact</a>
          </div>
        </div>
      </div>
      <div class="container ad-shell" id="mobile-banner-ad" data-ad="mobile" aria-hidden="true">
        <div class="ad-container ad-banner-320x50">
          <script>
            atOptions = {
              key: "d22ebf285f47755fabff0102c2736692",
              format: "iframe",
              height: 50,
              width: 320,
              params: {},
            };
          </script>
          <script src="https://behavecurlescalator.com/d22ebf285f47755fabff0102c2736692/invoke.js"></script>
        </div>
      </div>
    </footer>`;

function updateFooter(html) {
  if (html.includes(OLD_SIMPLE_FOOTER)) {
    return html.replace(OLD_SIMPLE_FOOTER, NEW_FOOTER);
  }
  return html;
}

function updateNav(html) {
  // Add Compare link after Tools in nav (handles single-line and multi-line formats, with/without active class)
  // Pattern 1: single-line generated page format
  html = html.replace(
    /(<a href="\/tools\/" class="nav-link(?: active)?">Tools<\/a>)\s*\n\s*(<a href="\/about\/" class="nav-link)/g,
    '$1\n        <a href="/compare/" class="nav-link">Compare</a>\n        $2'
  );
  // Pattern 2: multi-line hand-written page format (with indentation)
  html = html.replace(
    /(<a href="\/tools\/" class="nav-link(?: active)?">[\s\S]*?Tools[\s\S]*?<\/a>)\s*\n\s*(<a href="\/about\/" class="nav-link)/g,
    '$1\n              <a href="/compare/" class="nav-link">Compare</a>\n              $2'
  );
  // Pattern 3: 404.html with scrolled class and no Tools
  if (html.includes('id="header-nav"') && !html.includes('/tools/')) {
    html = html.replace(
      /(<a href="\/trending\/" class="nav-link[^"]*">Trending<\/a>)\s*\n(\s*)<a href="\/about\/"/g,
      '$1\n$2<a href="/tools/" class="nav-link">Tools</a>\n$2<a href="/compare/" class="nav-link">Compare</a>\n$2<a href="'
    );
  }
  return html;
}

const AD_BLOCK = `<div class="container ad-shell" id="mid-content-ad" data-ad="desktop" aria-hidden="true">
        <div class="ad-container ad-banner-728x90">
          <script>
            atOptions = {
              key: "4d2a4eb320f23a0188fc0bafbe9dfe46",
              format: "iframe",
              height: 90,
              width: 728,
              params: {},
            };
          </script>
          <script src="https://behavecurlescalator.com/4d2a4eb320f23a0188fc0bafbe9dfe46/invoke.js"></script>
        </div>
      </div>`;

function addMidContentAd(html) {
  // Add ad before Explore More section (internalLinksHTML pattern)
  // Only for pages that have Explore More but not already the ad
  if (html.includes('Explore More') && !html.includes('mid-content-ad')) {
    html = html.replace(
      /(<\/div>\s*\n\s*<\/div>\s*\n\s*<\/section>\s*\n\s*<section\s+[^>]*class="[^"]*post-card[^"]*"[^>]*>|<!-- Explore More -->)/,
      AD_BLOCK + '\n      $1'
    );
    html = html.replace(
      /(<h2[^>]*>Explore More<\/h2>)/,
      AD_BLOCK + '\n\n      $1'
    );
  }
  return html;
}

function getActivePath(filePath) {
  const rel = filePath.replace(SITE_ROOT, '').replace('/index.html', '').replace(/\/$/, '') || '/';
  if (rel === '/') return '/';
  if (rel.startsWith('/blog/')) return '/blog/';
  if (rel.startsWith('/guides/')) return '/guides/';
  if (rel.startsWith('/tools/')) return '/tools/';
  if (rel.startsWith('/compare/')) return '/compare/';
  if (rel.startsWith('/showcase/')) return '/showcase/';
  if (rel.startsWith('/tutorials/')) return '/tutorials/';
  if (rel.startsWith('/new/')) return '/new/';
  if (rel.startsWith('/trending/')) return '/trending/';
  if (rel.startsWith('/about/')) return '/about/';
  if (rel.startsWith('/contact/')) return '/contact/';
  if (rel.startsWith('/terms/')) return '/terms/';
  if (rel.startsWith('/privacy/')) return '/privacy/';
  if (rel.startsWith('/domains/')) return '/domains/';
  if (rel.startsWith('/editorial-standards/')) return '/editorial-standards/';
  return '/';
}

function updateActiveStates(html, activePath) {
  // Remove existing active classes from nav links
  html = html.replace(/class="nav-link active"/g, 'class="nav-link"');
  // Set active on the correct link
  const activeHref = activePath;
  html = html.replace(
    new RegExp(`(<a href="${activeHref}" class="nav-link)(")`),
    '$1 active$2'
  );
  return html;
}

function findIndexFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'generator' || entry.name === 'includes') continue;
    if (entry.isDirectory()) {
      results.push(...findIndexFiles(fullPath));
    } else if (entry.name === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  const files = findIndexFiles(SITE_ROOT);

  console.log(`Found ${files.length} HTML files`);
  let updated = 0;

  for (const fullPath of files) {
    let html = readFileSync(fullPath, 'utf-8');

    const before = html;

    // 1. Update footer
    html = updateFooter(html);

    // 2. Update nav
    html = updateNav(html);

    // 3. Update active states if footer changed
    if (html !== before) {
      const activePath = getActivePath(fullPath);
      html = updateActiveStates(html, activePath);
      writeFileSync(fullPath, html);
      updated++;
      console.log(`  Updated: ${fullPath.replace(SITE_ROOT, '')}`);
    }
  }

  console.log(`\nUpdated ${updated} files`);
}

main();
