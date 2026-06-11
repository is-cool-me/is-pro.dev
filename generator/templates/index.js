import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = process.env.SITE_ROOT || join(__dirname, "..", "is-pro.dev");

const BASE_URL = "https://is-pro.dev";
const AUTHOR = "Mayank Baswal";
const PUBLISHER = "is-cool-me";
const LOGO_URL = "https://is-pro.dev/dist/images/logo.png";
const OG_IMAGE = "https://is-pro.dev/dist/images/is-pro.dev.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/domains/", label: "Domains" },
  { href: "/blog/", label: "Blog" },
  { href: "/guides/", label: "Guides" },
  { href: "/showcase/", label: "Showcase" },
  { href: "/trending/", label: "Trending" },
  { href: "/tools/", label: "Tools" },
  { href: "/compare/", label: "Compare" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/terms/", label: "Terms" },
];

function navHTML(activePath = "") {
  return NAV_LINKS.map(({ href, label }) => {
    const isActive = activePath === href || activePath.startsWith(href + "/");
    return `<a href="${href}" class="nav-link${isActive ? " active" : ""}">${label}</a>`;
  }).join("\n        ");
}

function footerHTML() {
  return `<footer class="site-footer" role="contentinfo">
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
}

function headerHTML(activePath = "", title = "is-cool-me") {
  return `<header class="site-header" role="banner">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="header-logo" aria-label="is-cool-me home">
        <img src="/dist/images/logo.png" alt="" width="32" height="32" aria-hidden="true" />
        <span class="logo-text">${title}</span>
      </a>
      <nav class="header-nav" id="header-nav" aria-label="Main navigation">
        ${navHTML(activePath)}
      </nav>
      <div class="header-actions">
        <a href="https://discord.gg/N8YzrkJxYy" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" aria-label="Join Discord">Discord</a>
        <a href="https://dash.is-pro.dev" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Open Dashboard <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="header-nav"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function jsonLdBreadcrumb(items) {
  return JSON.stringify({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${BASE_URL}${item.href}`,
    })),
  });
}

function htmlHead({
  title,
  description,
  canonical,
  ogType = "website",
  ogTitle,
  ogDesc,
  article,
}) {
  const t = title || "is-cool-me — Free Subdomains for Developers";
  const d =
    description ||
    "Free subdomains for developers. Grab a free subdomain under is-pro.dev or is-into.tech, sign in with GitHub, and manage DNS records from one dashboard.";
  const c = canonical || BASE_URL;
  const ogT = ogTitle || t;
  const ogD = ogDesc || d;
  const datePub = article?.datePublished;
  const dateMod = article?.dateModified || datePub;

  let schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: t,
        description: d,
        publisher: {
          "@type": "Organization",
          name: PUBLISHER,
          url: BASE_URL,
          logo: { "@type": "ImageObject", url: LOGO_URL },
        },
      },
    ],
  };

  if (article) {
    schema["@graph"].splice(1, 0, {
      "@type": "TechArticle",
      headline: article.headline || t,
      description: article.description || d,
      author: { "@type": "Person", name: AUTHOR, url: `${BASE_URL}/about/` },
      publisher: {
        "@type": "Organization",
        name: PUBLISHER,
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: LOGO_URL },
      },
      datePublished: datePub,
      dateModified: dateMod,
      mainEntityOfPage: { "@type": "WebPage", "@id": c },
      url: c,
    });
    schema["@graph"].push(
      JSON.parse(jsonLdBreadcrumb(article.breadcrumbs || [])),
    );
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <title>${escHtml(t)}</title>
  <meta name="description" content="${escHtml(d)}" />
  <link rel="canonical" href="${c}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${c}" />
  <meta property="og:title" content="${escHtml(ogT)}" />
  <meta property="og:description" content="${escHtml(ogD)}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escHtml(ogT)}" />
  <meta name="twitter:description" content="${escHtml(ogD)}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <meta name="theme-color" content="#08080f" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://behavecurlescalator.com https://analytics.is-pro.dev; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://dns.google https://corsproxy.io https://api.allorigins.win https://ip-api.com; frame-src 'self' https://behavecurlescalator.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; object-src 'none'; base-uri 'self'; form-action 'self'" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <link rel="icon" href="/dist/images/logo.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/main.css" />
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
</head>
<body>
<a href="#main-content" class="sr-only" style="position:fixed;top:1rem;left:1rem;z-index:9999;background:var(--color-accent);color:#fff;padding:.5rem 1rem;border-radius:var(--radius-md);transform:translateY(-200%);transition:transform .2s;" onfocus="this.style.transform='translateY(0)'" onblur="this.style.transform='translateY(-200%)'">Skip to main content</a>
`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"');
}

function pageHeroHTML(tag, heading, subtitle) {
  return `<div class="page-hero">
    <div class="container">
      <div class="page-hero-content" data-reveal>
        <div class="section-tag page-tag">${tag}</div>
        <h1>${heading}</h1>
        <p>${subtitle}</p>
      </div>
    </div>
  </div>`;
}

function postCardHTML({
  href,
  title,
  excerpt,
  category,
  tag,
  readTime,
  gradient,
}) {
  const bgStyle = gradient
    ? `background:${gradient};`
    : "background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12));";
  const iconStyle =
    "display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--color-accent-light);";
  const thumbInner = `<div style="${bgStyle}${iconStyle}">${tag || "📄"}</div>`;
  const tags = category ? `<span class="post-card-tag">${category}</span>` : "";

  return `<article class="post-card" data-reveal>
  <div class="post-card-thumb">${thumbInner}</div>
  <div class="post-card-body">
    <div class="post-card-tags">${tags}</div>
    <h3 class="post-card-title">${title}</h3>
    <p class="post-card-excerpt">${excerpt}</p>
    ${readTime ? `<div class="post-card-meta"><span>⏱ ${readTime} min read</span></div>` : ""}
    <a href="${href}" class="btn btn-outline btn-sm" style="margin-top:.75rem;align-self:flex-start;">Read More</a>
  </div>
</article>`;
}

function showcaseCardHTML({ href, title, description, category, subdomain }) {
  return `<article class="post-card" data-reveal>
  <div class="post-card-thumb" style="background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12));display:flex;align-items:center;justify-content:center;height:140px;overflow:hidden;">
    <div style="text-align:center;color:var(--color-accent-light);">
      <div style="font-size:2rem;font-family:var(--font-mono);">${subdomain || "project"}</div>
      <div style="font-size:.7rem;color:var(--color-text-muted);margin-top:.25rem;">${category || "Project"}</div>
    </div>
  </div>
  <div class="post-card-body">
    <div class="post-card-tags"><span class="post-card-tag">${category || "Showcase"}</span></div>
    <h3 class="post-card-title">${title}</h3>
    <p class="post-card-excerpt">${description}</p>
    <a href="${href}" class="btn btn-outline btn-sm" style="margin-top:.75rem;align-self:flex-start;">View Project</a>
  </div>
</article>`;
}

function articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml }) {
  return `${headHtml}
${headerHtml}
<main id="main-content">
${contentHtml}
</main>
${footerHtml}
<script src="/js/app.js" defer></script>
</body>
</html>`;
}

function guideContentHTML({
  title,
  category,
  readTime,
  difficulty,
  summary,
  content,
  faqs,
  breadcrumbs,
}) {
  const difficultyColors = {
    Beginner:
      "rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.2);color:#4ade80;",
    Intermediate:
      "rgba(234,179,8,0.1);border-color:rgba(234,179,8,0.2);color:#eab308;",
    Advanced:
      "rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.2);color:#ef4444;",
  };
  const diffStyle = difficulty
    ? difficultyColors[difficulty] || difficultyColors.Beginner
    : difficultyColors.Beginner;
  const diffLabel = difficulty || "Beginner";

  let faqHTML = "";
  if (faqs && faqs.length > 0) {
    faqHTML =
      "<h2>FAQ</h2>" +
      faqs
        .map(({ q, a }) => `<p><strong>${q}</strong></p>\n<p>${a}</p>`)
        .join("\n");
  }

  const articleContent = `<article>
  <header class="article-hero">
    <div class="container">
      <div class="article-hero-inner">
        <div class="article-meta">
          <span class="article-category">${category || "Guide"}</span>
          <span class="article-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${readTime || 10} min read</span>
          <span class="article-meta-item" style="background:${diffStyle};padding:.2rem .6rem;border-radius:var(--radius-full);font-size:.8rem;">${diffLabel}</span>
        </div>
        <h1>${title}</h1>
        <p class="article-summary">${summary || ""}</p>
      </div>
    </div>
  </header>

  <section class="author-section" aria-label="Article authorship">
    <div class="container">
      <div class="author-card" data-reveal>
        <div class="author-card-main">
          <h2 class="author-card-title">Written by ${AUTHOR}</h2>
          <p class="author-card-role">Founder of ${PUBLISHER} · DNS & Platform Infrastructure</p>
          <p class="author-card-bio">${AUTHOR} maintains the ${PUBLISHER} platform and writes technical guides focused on DNS configuration, subdomain infrastructure, SSL troubleshooting, deployment workflows, and platform reliability.</p>
          <div class="author-card-links">
            <a href="https://github.com/LightHostingFree" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            <a href="/contact/">Contact</a>
          </div>
        </div>
        <div class="author-card-review">
          <span class="author-card-review-label">Reviewed by</span>
          <span class="author-card-reviewer">${PUBLISHER} Technical Review</span>
        </div>
      </div>
    </div>
  </section>

  <div class="article-layout-section">
    <div class="container">
      <div class="article-layout-inner">
        <div class="article-content prose">
${content}
${faqHTML}
        </div>
      </div>
    </div>
  </div>
</article>`;

  return articleContent;
}

function blogPostContentHTML({
  title,
  category,
  readTime,
  summary,
  content,
  faqs,
}) {
  let faqHTML = "";
  if (faqs && faqs.length > 0) {
    faqHTML =
      "<h2>Frequently Asked Questions</h2>" +
      faqs
        .map(({ q, a }) => `<p><strong>${q}</strong></p>\n<p>${a}</p>`)
        .join("\n");
  }

  return `<article>
  <header class="article-hero">
    <div class="container">
      <div class="article-hero-inner">
        <div class="article-meta">
          <span class="article-category">${category || "Blog"}</span>
          <span class="article-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${readTime || 8} min read</span>
        </div>
        <h1>${title}</h1>
        <p class="article-summary">${summary || ""}</p>
      </div>
    </div>
  </header>

  <div class="article-layout-section">
    <div class="container">
      <div class="article-layout-inner">
        <div class="article-content prose">
${content}
${faqHTML}
        </div>
      </div>
    </div>
  </div>
</article>`;
}

function toolPageHTML({ name, description, category, content, examples }) {
  return `<article>
  <header class="article-hero">
    <div class="container">
      <div class="article-hero-inner">
        <div class="article-meta">
          <span class="article-category">${category || "Tool"}</span>
          <span class="article-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Developer Tool</span>
        </div>
        <h1>${name}</h1>
        <p class="article-summary">${description || ""}</p>
      </div>
    </div>
  </header>

  <div class="article-layout-section">
    <div class="container">
      <div class="article-layout-inner">
        <div class="article-content prose">
${content}
        </div>
      </div>
    </div>
  </div>
</article>`;
}

function internalLinksHTML(sections) {
  const items = sections
    .map(
      (s) =>
        `<div style="background:var(--color-card);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:1.25rem;">
      <h4 style="color:var(--color-accent-light);font-size:.9rem;margin-bottom:.5rem;">${s.title}</h4>
      <ul style="display:flex;flex-direction:column;gap:.35rem;">
        ${s.links.map((l) => `<li><a href="${l.href}" style="color:var(--color-text-muted);font-size:.9rem;transition:color .2s;" onmouseover="this.style.color='var(--color-accent-light)'" onmouseout="this.style.color='var(--color-text-muted)'">${l.label}</a></li>`).join("\n        ")}
      </ul>
    </div>`,
    )
    .join("\n    ");

  return `<section style="padding:var(--space-12) 0;border-top:1px solid var(--color-border-sub);">
    <div class="container">
      <h2 style="font-size:1.5rem;margin-bottom:1.5rem;">Explore More</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
      ${items}
      </div>
    </div>
  </section>`;
}

function midContentAdHTML() {
  return `<div class="container ad-shell" id="mid-content-ad" data-ad="desktop" aria-hidden="true">
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
}

function poweredByFooter(slug) {
  return `<div style="text-align:center;padding:2rem 0;border-top:1px solid var(--color-border-sub);margin-top:2rem;">
  <a href="https://is-pro.dev/showcase/${slug}/" style="color:var(--color-text-subtle);font-size:.85rem;" target="_blank" rel="noopener">Powered by <strong style="color:var(--color-accent);">is-pro.dev</strong></a>
</div>`;
}

export {
  htmlHead,
  headerHTML,
  footerHTML,
  pageHeroHTML,
  postCardHTML,
  showcaseCardHTML,
  articlePageHTML,
  guideContentHTML,
  blogPostContentHTML,
  toolPageHTML,
  internalLinksHTML,
  midContentAdHTML,
  poweredByFooter,
  escHtml,
  BASE_URL,
  AUTHOR,
  PUBLISHER,
  SITE_ROOT,
};
