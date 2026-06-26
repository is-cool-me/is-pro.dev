import { generateWithGroq, getRateLimitStatus } from '../lib/groq.js';
import {
  htmlHead,
  headerHTML,
  footerHTML,
  guideContentHTML,
  blogPostContentHTML,
  articlePageHTML,
  internalLinksHTML,
} from '../templates/index.js';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://is-pro.dev';
const SITE_ROOT = '/home/ubuntu/is-pro.dev';

const delay = ms => new Promise(r => setTimeout(r, ms));

function getArticleWordCount(html) {
  const m = html.match(/<div class="article-content prose">(.*?)<\/article>/s);
  if (m) {
    const text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.split(/\s+/).filter(Boolean).length;
  }
  return 0;
}

function isAiEnabled() {
  return process.env.AI_ENABLED === 'true' && !!process.env.GROQ_API_KEY;
}

async function generateGuideContent(slug, title, keywords, category, difficulty, summary, relatedSlugs) {
  const prompt = `Write a comprehensive, in-depth technical guide — minimum 2500 words, target 3000 words — about: "${title}".
Keywords: ${keywords.join(', ')}
Target audience: Developers setting up projects on is-cool-me subdomains.
Style: Technical but accessible, with practical steps, code examples where relevant, real-world context, and detailed explanations. Be thorough and exhaustive — err on the side of over-explaining rather than under-explaining.

Structure (follow this exactly):
1. Introduction (200+ words): context and motivation for the topic, why it matters
2. Prerequisites (150+ words): what readers need before starting
3. Step-by-step instructions (500+ words): detailed walkthrough with numbered steps, include actual commands and configuration examples
4. Configuration deep-dive (300+ words): explain all config options with real values like "api.myproject.is-pro.dev"
5. Common pitfalls and solutions (300+ words): at least 5 pitfalls with specific fix instructions
6. Best practices (200+ words): performance, security, maintainability tips
7. Troubleshooting section (300+ words): diagnostic steps, how to debug failures
8. Deployment scenario from operations (300+ words): one complete real-world example with all config values
9. Common mistakes (bullet list, minimum 5 items with specific details)
10. How to verify it works (numbered steps, minimum 5 verification checks)
11. Conclusion with next steps (150+ words)
12. FAQ (4-5 questions with detailed answers, minimum 100 words each)

CRITICAL requirements:
- Do NOT use placeholder text like "insert your domain here" — use concrete examples like "myproject.is-pro.dev"
- Do NOT repeat the title as a section heading (the H1 is already the title)
- Every section must have substantive content — no one-liners
- Include at least 3 code examples with complete, runnable commands
- Include at least 2 tables or lists comparing options/settings
Generate ONLY the article body content, no metadata, no JSON.`;

  const systemPrompt = `You are a senior technical writer for is-cool-me, a free developer platform. Write in a clear, authoritative voice. Use concrete examples with real subdomain examples like "myproject.is-pro.dev". Avoid filler, repetition, and generic intros. Focus on practical value. Each section should teach something useful.`;

  if (isAiEnabled()) {
    console.log(`[ai] Generating guide: ${slug}`);
    try {
      const content = await generateWithGroq(prompt, systemPrompt, 4500);
      await delay(2000);
      return content;
    } catch (e) {
      console.warn(`[ai] Failed for ${slug}: ${e.message}`);
    }
  }
  return null;
}

async function generateBlogContent(slug, title, keywords, category, summary, relatedSlugs) {
  const prompt = `Write a compelling, in-depth blog post — minimum 2000 words, target 2500 words — about: "${title}".
Keywords: ${keywords.join(', ')}
Style: Thoughtful, well-argued, with personal perspective where appropriate. Should feel like it was written by someone who actually runs a developer platform and has hands-on experience. Be thorough — include detailed explanations, real examples, and substantive analysis.

Structure (follow this exactly):
1. Introduction (250+ words): hook the reader with a compelling problem or insight, establish your perspective
2. Background and context (300+ words): explain the historical context, why this matters now
3. Deep dive (600+ words): 3-4 H2 sections with concrete examples, data points, and specific scenarios
4. Real-world case studies (400+ words): at least 2 specific examples with named services/subdomains
5. Lessons learned / war stories (300+ words): share specific mistakes, how they were fixed
6. Practical takeaways (300+ words): actionable advice readers can implement today
7. Key takeaways (bullet list, minimum 5 substantial items)
8. Deployment scenario from operations (200+ words): a real-world example with specific values
9. Common mistakes (bullet list, minimum 5 items)
10. How to verify it works (numbered steps, minimum 4 checks)
11. FAQ (4 questions with detailed 100+ word answers)

CRITICAL requirements:
- Do NOT use placeholder text — use real examples with actual subdomains, tools, and services
- Write with genuine insight — share war stories, gotchas, and things learned the hard way
- Every section must have substantive content — no one-liners
- Include at least 2 specific data points or metrics
Generate ONLY the article body content, no metadata.`;

  const systemPrompt = `You are a technical blogger writing for is-cool-me, a free developer platform. Your voice is knowledgeable but approachable - write like a senior developer sharing hard-won knowledge. You write about real problems developers face. Use specific examples and avoid generic advice. Each paragraph should add value.`;

  if (isAiEnabled()) {
    console.log(`[ai] Generating blog: ${slug}`);
    try {
      const content = await generateWithGroq(prompt, systemPrompt, 4000);
      await delay(2000);
      return content;
    } catch (e) {
      console.warn(`[ai] Failed for ${slug}: ${e.message}`);
    }
  }
  return null;
}

function buildGuidePage(slug, title, category, difficulty, summary, content, relatedSlugs) {
  const today = new Date().toISOString().split('T')[0];
  const dateLabel = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const readTime = Math.max(1, Math.ceil(content.split(' ').length / 200));
  const shareUrl = `${BASE_URL}/guides/${slug}/`;

  const breadcrumbs = [
    { name: 'Home', href: BASE_URL + '/' },
    { name: 'Guides', href: BASE_URL + '/guides/' },
    { name: title, href: BASE_URL + `/guides/${slug}/` },
  ];

  const headHtml = htmlHead({
    title: `${title} — is-cool-me`,
    description: summary,
    canonical: shareUrl,
    ogType: 'article',
    keywords: null,
    article: { headline: title, description: summary, datePublished: today, dateModified: today, breadcrumbs },
  });

  const headerHtml = headerHTML('/guides/', 'is-cool-me');
  const contentHtml = guideContentHTML({
    title, category, readTime, difficulty, summary,
    content: content.replace(/^/gm, '          '),
    breadcrumbs, date: dateLabel, shareUrl,
    prev: null, next: null, relatedTopics: [],
  }) + internalLinksHTML([]);
  const footerHtml = footerHTML();

  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function buildBlogPage(slug, title, category, summary, content, relatedSlugs) {
  const today = new Date().toISOString().split('T')[0];
  const dateLabel = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const readTime = Math.max(1, Math.ceil(content.split(' ').length / 200));
  const shareUrl = `${BASE_URL}/blog/${slug}/`;

  const breadcrumbs = [
    { name: 'Home', href: BASE_URL + '/' },
    { name: 'Blog', href: BASE_URL + '/blog/' },
    { name: title, href: BASE_URL + `/blog/${slug}/` },
  ];

  const headHtml = htmlHead({
    title: `${title} — is-cool-me Blog`,
    description: summary,
    canonical: shareUrl,
    ogType: 'article',
    keywords: null,
    article: { headline: title, description: summary, datePublished: today, dateModified: today, breadcrumbs },
  });

  const headerHtml = headerHTML('/blog/', 'is-cool-me');
  const contentHtml = blogPostContentHTML({
    title, category, readTime, summary,
    content: content.replace(/^/gm, '          '),
    date: dateLabel, shareUrl,
    prev: null, next: null, relatedTopics: [],
  }) + internalLinksHTML([]);
  const footerHtml = footerHTML();

  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function main() {
  const THRESHOLD = 1000;
  const guidesToRegen = [];
  const blogsToRegen = [];

  // Scan all guide directories
  const guideDirs = readdirSync(join(SITE_ROOT, 'guides'), { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const slug of guideDirs) {
    const fp = join(SITE_ROOT, 'guides', slug, 'index.html');
    if (!existsSync(fp)) continue;
    const html = readFileSync(fp, 'utf-8');
    const wc = getArticleWordCount(html);
    if (wc < THRESHOLD) {
      // Try to extract title from the HTML
      const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
      const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      guidesToRegen.push({ slug, title });
    }
  }

  // Scan all blog directories
  const blogDirs = readdirSync(join(SITE_ROOT, 'blog'), { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const slug of blogDirs) {
    const fp = join(SITE_ROOT, 'blog', slug, 'index.html');
    if (!existsSync(fp)) continue;
    const html = readFileSync(fp, 'utf-8');
    const wc = getArticleWordCount(html);
    if (wc < THRESHOLD) {
      const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
      const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      blogsToRegen.push({ slug, title });
    }
  }

  console.log(`Need to regenerate: ${guidesToRegen.length} guides, ${blogsToRegen.length} blogs\n`);

  for (const { slug, title } of guidesToRegen) {
    console.log(`Processing guide: ${slug}`);
    const content = await generateGuideContent(slug, title, [slug], 'Guide', 'Intermediate', `Guide about ${title}`, []);
    if (content) {
      const html = buildGuidePage(slug, title, 'Guide', 'Intermediate', `Guide about ${title}`, content, []);
      const fp = join(SITE_ROOT, 'guides', slug, 'index.html');
      writeFileSync(fp, html);
      const wc = getArticleWordCount(html);
      console.log(`  -> ${wc} words`);
    }
  }

  for (const { slug, title } of blogsToRegen) {
    console.log(`Processing blog: ${slug}`);
    const content = await generateBlogContent(slug, title, [slug], 'Blog', `Blog about ${title}`, []);
    if (content) {
      const html = buildBlogPage(slug, title, 'Blog', `Blog about ${title}`, content, []);
      const fp = join(SITE_ROOT, 'blog', slug, 'index.html');
      writeFileSync(fp, html);
      const wc = getArticleWordCount(html);
      console.log(`  -> ${wc} words`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);