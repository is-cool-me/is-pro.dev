import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

function escHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function injectAfterArticle(html, injection) {
  const marker = '</article>';
  const idx = html.lastIndexOf(marker);
  if (idx === -1) return html;
  return html.slice(0, idx + marker.length) + '\n' + injection + html.slice(idx + marker.length);
}

function shareButtonsHTML(url, title) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return `<div style="display:flex;gap:.75rem;align-items:center;padding:1.5rem 0;border-top:1px solid var(--color-border-sub);margin-top:2rem;">
    <span style="font-size:.9rem;color:var(--color-text-muted);font-weight:600;">Share this article</span>
    <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35rem;padding:.4rem .75rem;border-radius:var(--radius-full);border:1px solid var(--color-border);font-size:.85rem;text-decoration:none;color:var(--color-text);transition:all .2s;" onmouseover="this.style.borderColor='var(--color-accent)'" onmouseout="this.style.borderColor='var(--color-border)'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>Share on X
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encoded}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35rem;padding:.4rem .75rem;border-radius:var(--radius-full);border:1px solid var(--color-border);font-size:.85rem;text-decoration:none;color:var(--color-text);transition:all .2s;" onmouseover="this.style.borderColor='var(--color-accent)'" onmouseout="this.style.borderColor='var(--color-border)'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>Share on LinkedIn
    </a>
  </div>`;
}

function prevNextHTML(prev, next) {
  const parts = [];
  if (prev) {
    parts.push(`<a href="${prev.href}" style="display:flex;flex-direction:column;gap:.25rem;padding:.75rem 1rem;border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;flex:1;transition:all .2s;" onmouseover="this.style.borderColor='var(--color-accent)'" onmouseout="this.style.borderColor='var(--color-border)'">
      <span style="font-size:.75rem;color:var(--color-text-muted);">Previous</span>
      <span style="font-size:.9rem;color:var(--color-accent-light);font-weight:500;">${escHtml(prev.label)}</span>
    </a>`);
  }
  if (next) {
    parts.push(`<a href="${next.href}" style="display:flex;flex-direction:column;gap:.25rem;padding:.75rem 1rem;border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;flex:1;text-align:right;transition:all .2s;" onmouseover="this.style.borderColor='var(--color-accent)'" onmouseout="this.style.borderColor='var(--color-border)'">
      <span style="font-size:.75rem;color:var(--color-text-muted);">Next</span>
      <span style="font-size:.9rem;color:var(--color-accent-light);font-weight:500;">${escHtml(next.label)}</span>
    </a>`);
  }
  if (parts.length === 0) return "";
  return `<div style="display:flex;gap:1rem;padding:1.5rem 0;border-top:1px solid var(--color-border-sub);">
    ${parts.join("")}
  </div>`;
}

function relatedArticlesHTML(related, baseUrl) {
  if (!related || related.length === 0) return "";
  return `<section style="padding:var(--space-8) 0;border-top:1px solid var(--color-border-sub);">
    <div class="container">
      <h2 style="font-size:1.5rem;margin-bottom:1.5rem;">Related Articles</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;">
        ${related.map(r => {
          const section = r.section || "blog";
          return `<article class="post-card" data-reveal>
            <div class="post-card-thumb" style="background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12));display:flex;align-items:center;justify-content:center;">
              <div style="font-size:2rem;">📄</div>
            </div>
            <div class="post-card-body">
              <div class="post-card-tags"><span class="post-card-tag">${escHtml(r.category || "General")}</span></div>
              <h3 class="post-card-title">${escHtml(r.title)}</h3>
              ${r.summary ? `<p class="post-card-excerpt">${escHtml(r.summary)}</p>` : ""}
              <a href="/${section}/${r.slug}/" class="btn btn-outline btn-sm" style="margin-top:.75rem;align-self:flex-start;">Read More</a>
            </div>
          </article>`;
        }).join("")}
      </div>
    </div>
  </section>`;
}

// Load topic data
const topicsPath = join(__dirname, "..", "content", "topics.js");
const topicsSrc = readFileSync(topicsPath, "utf-8");

// Extract GUIDE_TOPICS and BLOG_TOPICS arrays
function parseTopicsArray(src, varName) {
  const match = src.match(new RegExp(`export const ${varName} = \\[([\\s\\S]*?)\\];`));
  if (!match) return [];
  const array = eval(`[${match[1]}]`);
  return array;
}

// Use dynamic import
import(topicsPath).then(({ GUIDE_TOPICS, BLOG_TOPICS }) => {
  const allTopics = [...GUIDE_TOPICS, ...BLOG_TOPICS];
  const guideTopicsMap = new Map(GUIDE_TOPICS.map(t => [t.slug, t]));
  const blogTopicsMap = new Map(BLOG_TOPICS.map(t => [t.slug, t]));
  const BASE_URL = "https://is-pro.dev";

  // Process guides
  const guidesDir = join(ROOT, "guides");
  let guideIdx = 0;
  for (const entry of readdirSync(guidesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const htmlPath = join(guidesDir, entry.name, "index.html");
    if (!existsSync(htmlPath)) continue;
    const slug = entry.name;
    const topic = guideTopicsMap.get(slug);
    if (!topic) { console.log(`  skip guide/${slug} (no topic)`); continue; }

    let html = readFileSync(htmlPath, "utf-8");

    // Check if already has share buttons
    if (html.includes('Share this article') || html.includes('Share on X')) {
      console.log(`  ✓ guide/${slug} (already enriched)`);
      guideIdx++;
      continue;
    }

    // Add published date to meta line if missing
    const dateLabel = "June 2026";
    const metaLine = html.match(/<span class="article-meta-item"><svg[^>]*>[\s\S]*?<\/svg>\d+ min read<\/span>/);
    if (metaLine && !html.includes('Published')) {
      const dateHTML = `<span class="article-meta-item">Published ${dateLabel}</span>\n          `;
      html = html.replace(/(<span class="article-meta-item"><svg[^>]*>[\s\S]*?<\/svg>\d+ min read<\/span>)/, `$1\n          ${dateHTML}`);
    }

    // Compute prev/next
    const idx = GUIDE_TOPICS.indexOf(topic);
    const prevTopic = idx > 0 ? GUIDE_TOPICS[idx - 1] : null;
    const nextTopic = idx < GUIDE_TOPICS.length - 1 ? GUIDE_TOPICS[idx + 1] : null;
    const prev = prevTopic ? { label: prevTopic.title, href: `/guides/${prevTopic.slug}/` } : null;
    const next = nextTopic ? { label: nextTopic.title, href: `/guides/${nextTopic.slug}/` } : null;

    // Compute related
    const relatedTopics = (topic.relatedSlugs || [])
      .map(slug => allTopics.find(t => t.slug === slug))
      .filter(Boolean)
      .map(t => ({ ...t, section: GUIDE_TOPICS.includes(t) ? "guides" : "blog" }));

    const shareUrl = `/guides/${slug}/`;
    const injection = shareButtonsHTML(BASE_URL + shareUrl, topic.title) +
      prevNextHTML(prev, next) +
      relatedArticlesHTML(relatedTopics, BASE_URL);

    html = injectAfterArticle(html, injection);
    writeFileSync(htmlPath, html, "utf-8");
    console.log(`  enriched guide/${slug}`);
    guideIdx++;
  }

  // Process blogs
  const blogDir = join(ROOT, "blog");
  let blogIdx = 0;
  for (const entry of readdirSync(blogDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'index.html') continue;
    const htmlPath = join(blogDir, entry.name, "index.html");
    if (!existsSync(htmlPath)) continue;
    const slug = entry.name;
    const topic = blogTopicsMap.get(slug);
    if (!topic) { console.log(`  skip blog/${slug} (no topic)`); continue; }

    let html = readFileSync(htmlPath, "utf-8");

    // Check if already has share buttons
    if (html.includes('Share this article') || html.includes('Share on X')) {
      console.log(`  ✓ blog/${slug} (already enriched)`);
      blogIdx++;
      continue;
    }

    // Add author section if missing (blogs from old generator don't have it)
    if (!html.includes('author-section') && !html.includes('Written by')) {
      const authorHTML = `
  <section class="author-section" aria-label="Article authorship">
    <div class="container">
      <div class="author-card" data-reveal>
        <div class="author-card-main">
          <h2 class="author-card-title">Written by Mayank Baswal</h2>
          <p class="author-card-role">Founder of is-cool-me · DNS & Platform Infrastructure</p>
          <p class="author-card-bio">Mayank Baswal maintains the is-cool-me platform and writes technical guides focused on DNS configuration, subdomain infrastructure, SSL troubleshooting, deployment workflows, and platform reliability.</p>
          <div class="author-card-links">
            <a href="https://github.com/LightHostingFree" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            <a href="/contact/">Contact</a>
          </div>
        </div>
        <div class="author-card-review">
          <span class="author-card-review-label">Reviewed by</span>
          <span class="author-card-reviewer">is-cool-me Technical Review</span>
        </div>
      </div>
    </div>
  </section>`;
      html = html.replace(/(<div class="article-layout-section">)/, authorHTML + '\n\n  $1');
    }

    // Add published date to meta line if missing
    if (!html.includes('Published')) {
      const dateLabel = "June 2026";
      const metaLine = html.match(/<span class="article-meta-item"><svg[^>]*>[\s\S]*?<\/svg>\d+ min read<\/span>/);
      if (metaLine) {
        const dateHTML = `<span class="article-meta-item">Published ${dateLabel}</span>\n          `;
        html = html.replace(/(<span class="article-meta-item"><svg[^>]*>[\s\S]*?<\/svg>\d+ min read<\/span>)/, `$1\n          ${dateHTML}`);
      }
    }

    // Compute prev/next
    const idx = BLOG_TOPICS.indexOf(topic);
    const prevTopic = idx > 0 ? BLOG_TOPICS[idx - 1] : null;
    const nextTopic = idx < BLOG_TOPICS.length - 1 ? BLOG_TOPICS[idx + 1] : null;
    const prev = prevTopic ? { label: prevTopic.title, href: `/blog/${prevTopic.slug}/` } : null;
    const next = nextTopic ? { label: nextTopic.title, href: `/blog/${nextTopic.slug}/` } : null;

    // Compute related
    const relatedTopics = (topic.relatedSlugs || [])
      .map(slug => allTopics.find(t => t.slug === slug))
      .filter(Boolean)
      .map(t => ({ ...t, section: GUIDE_TOPICS.includes(t) ? "guides" : "blog" }));

    const shareUrl = `/blog/${slug}/`;
    const injection = shareButtonsHTML(BASE_URL + shareUrl, topic.title) +
      prevNextHTML(prev, next) +
      relatedArticlesHTML(relatedTopics, BASE_URL);

    html = injectAfterArticle(html, injection);
    writeFileSync(htmlPath, html, "utf-8");
    console.log(`  enriched blog/${slug}`);
    blogIdx++;
  }

  console.log(`\nDone: ${guideIdx} guides, ${blogIdx} blogs enriched`);
}).catch(err => { console.error(err); process.exit(1); });
