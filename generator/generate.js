import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  cpSync,
  rmSync,
  readdirSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { createRequire } from "module";
import { lookup } from "dns/promises";
const require = createRequire(import.meta.url);
import {
  generateWithOllama,
  isOllamaRunning,
} from "./lib/ollama.js";

function isAiEnabled() {
  return (
    process.env.AI_ENABLED === "true" &&
    !!process.env.OLLAMA_HOST
  );
}

import {
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
  BASE_URL,
  AUTHOR,
  SITE_ROOT,
} from "./templates/index.js";
import {
  GUIDE_TOPICS,
  BLOG_TOPICS,
  TUTORIAL_TOPICS,
  COMPARE_TOPICS,
  TOOL_PAGES,
  SHOWCASE_CATEGORIES,
  SHOWCASE_TOPICS,
  INTERNAL_LINK_SECTIONS,
} from "./content/topics.js";
import { GUIDE_BODIES } from "./content/guide-bodies.js";
import { BLOG_BODIES } from "./content/blog-bodies.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.SITE_ROOT || join(__dirname, "..", "is-pro.dev");
const CONTENT_ROOT = join(OUT_DIR, "..");

function getDbPath() {
  const defaultPath = join(__dirname, "..", "dash", "data", "domains.db");
  return process.env.DB_PATH || defaultPath;
}

function readDb() {
  const path = getDbPath();
  if (!existsSync(path)) {
    console.warn("[db] No database found at", path);
    return [];
  }
  try {
    const Database = require("better-sqlite3");
    const db = new Database(path, { readonly: true });
    const rows = db
      .prepare(
        `
      SELECT d.subdomain, d.zone, d.owner_username, d.owner_email,
             d.created_at, d.updated_at,
             (SELECT COUNT(*) FROM dns_records WHERE domain_id = d.id) as record_count
      FROM domains d
      WHERE d.owner_username IS NOT NULL
      ORDER BY d.created_at DESC
      LIMIT 200
    `,
      )
      .all();
    db.close();
    return rows;
  } catch (err) {
    console.warn("[db] Failed to read database:", err.message);
    return [];
  }
}

async function filterOnlineDomains(domains) {
  if (!domains || domains.length === 0) return [];
  if (!isAiEnabled()) {
    console.log("[ai] Skipping online check (AI not enabled)");
    return domains;
  }
  console.log(`[check] Verifying ${domains.length} domains return HTTP 200...`);
  const online = [];
  const concurrency = 20;
  for (let i = 0; i < domains.length; i += concurrency) {
    const batch = domains.slice(i, i + concurrency);
    const results = await Promise.all(
      batch.map(async (d) => {
        const hostname = `${d.subdomain}.${d.zone}`;
        const ssrf = await checkSsrfTarget(hostname);
        if (!ssrf.ok) {
          console.warn(`  [ssrf] Skipping ${hostname}: ${ssrf.reason}`);
          return null;
        }
        try {
          const r = await fetch(`https://${hostname}`, {
            method: "HEAD",
            signal: AbortSignal.timeout(5000),
          });
          return r.status === 200 ? d : null;
        } catch {
          return null;
        }
      }),
    );
    for (const r of results) {
      if (r) online.push(r);
    }
    if (i + concurrency < domains.length) {
      process.stdout.write(
        `\r[check] ${online.length} online / ${i + concurrency} checked`,
      );
    }
  }
  console.log(
    `\n[check] ${online.length}/${domains.length} domains returning HTTP 200`,
  );
  return online;
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function generateContent(prompt, systemPrompt) {
  try {
    const content = await generateWithOllama(prompt, systemPrompt);
    if (content) {
      console.log("[ai] Generated content with Ollama");
      return content;
    }
    return null;
  } catch (err) {
    console.warn("[ai] Generation failed, using fallback content");
    return null;
  }
}

function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"');
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writePage(filePath, content) {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, "utf8");
}

function relativeTime(dateStr) {
  if (!dateStr) return "recently";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch {
    return "recently";
  }
}

const SSRF_DNS_CACHE = new Map();
const SSRF_CACHE_TTL = 300_000;

function redact(value) {
  const patterns = [
    [/(ghp_|gho_|ghu_|ghs_|ghr_)[A-Za-z0-9_]{36,}/g, "ghp_***redacted***"],
    [/(bearer|Bearer)\s+[A-Za-z0-9\-._~+/]+/g, "Bearer ***redacted***"],
    [
      /(?:access_token|token|secret|key|password|auth)\s*[:=]\s*['"]?[A-Za-z0-9\-._~+/]{16,}/gi,
      "$1: ***redacted***",
    ],
  ];
  let s = String(value);
  for (const [re, replacement] of patterns) {
    s = s.replace(re, replacement);
  }
  return s;
}

function validateEnv() {
  const required = [];
  const warnings = [];
  if (!process.env.GH_PAT)
    warnings.push("GH_PAT is not set — commits via --push will fail");
  if (
    !process.env.DB_PATH &&
    !existsSync(join(__dirname, "..", "dash", "data", "domains.db"))
  ) {
    warnings.push(
      "DB_PATH is not set and default path dash/data/domains.db does not exist — domain data will be empty",
    );
  }
  for (const v of required) {
    if (!process.env[v]) {
      console.error(`[env] FATAL: ${v} is required but not set`);
      process.exit(1);
    }
  }
  for (const w of warnings) {
    console.warn(`[env] ${w}`);
  }
}

const PRIVATE_IP_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^0\./,
  /^169\.254\./,
  /^::1$/,
  /^fc00:/,
  /^fe80:/,
  /^100\.(6[4-9]|\d{2,3})\./,
  /^198\.(1[89]|2[0-4])\./,
];

async function checkSsrfTarget(hostname) {
  try {
    const cached = SSRF_DNS_CACHE.get(hostname);
    if (cached && Date.now() - cached.ts < SSRF_CACHE_TTL) {
      return cached.result;
    }
    const addresses = await lookup(hostname, { all: true });
    const ips = addresses.map((a) => a.address);
    const blocked = ips.some((ip) => PRIVATE_IP_RANGES.some((r) => r.test(ip)));
    const result = blocked
      ? { ok: false, reason: "Blocked private/reserved IP" }
      : { ok: true };
    SSRF_DNS_CACHE.set(hostname, { ts: Date.now(), result });
    return result;
  } catch (err) {
    return { ok: false, reason: "DNS resolution failed" };
  }
}

function buildGuideContent(topic, aiContent) {
  const content =
    aiContent ||
    topic.body ||
    `<h2>Introduction</h2>
<p>${topic.summary}</p>
<h2>Prerequisites</h2>
<ul><li>A GitHub account</li><li>An is-pro.dev subdomain registered at dash.is-pro.dev</li><li>Basic familiarity with DNS records</li></ul>
<h2>Step 1: Configure Your Subdomain</h2>
<p>Register your free subdomain at dash.is-pro.dev. Once registered, navigate to the DNS management section to configure the records needed for your project. Cloudflare handles the underlying DNS infrastructure, so propagation is typically instant.</p>
<h2>Step 2: Set Up DNS Records</h2>
<p>Depending on your hosting provider, you will need to add appropriate DNS records. Common setups include CNAME records for platforms like GitHub Pages, Vercel, or Netlify, or A records for VPS deployments.</p>
<h2>Step 3: Enable SSL</h2>
<p>All is-pro.dev subdomains come with free SSL through Cloudflare. Make sure your DNS is configured correctly and allow a few minutes for the certificate to provision automatically.</p>
<h2>Step 4: Verify Your Setup</h2>
<p>Visit your subdomain in a browser to confirm everything is working. Check for the padlock icon indicating a valid SSL certificate.</p>
<h2>Best Practices</h2>
<ul><li>Always use HTTPS in production</li><li>Monitor your DNS configuration regularly</li><li>Keep your subdomain registration active</li><li>Use descriptive subdomain names for better SEO</li></ul>
<h2>Conclusion</h2>
<p>Following these steps, you should now have your project live on a custom is-pro.dev subdomain with free hosting, DNS management, and SSL security.</p>`;

  const faqs = [
    {
      q: `Is ${topic.category} setup free on is-pro.dev?`,
      a: "Yes, all subdomains on is-pro.dev include free DNS management and SSL certificates.",
    },
    {
      q: "How long does DNS take to propagate?",
      a: "Cloudflare typically propagates DNS changes within seconds to a few minutes globally.",
    },
    {
      q: "Can I use this for commercial projects?",
      a: "Yes, is-pro.dev subdomains can be used for personal and commercial projects within our fair use policy.",
    },
  ];

  return {
    content,
    faqs,
    breadcrumbs: [
      { name: "Home", href: BASE_URL + "/" },
      { name: "Guides", href: BASE_URL + "/guides/" },
      { name: topic.title, href: BASE_URL + `/guides/${topic.slug}/` },
    ],
  };
}

async function generateGuide(topic) {
  topic.body = GUIDE_BODIES[topic.slug] || null;
  console.log(`  Generating guide: ${topic.slug}`);
  const prompt = `Write a comprehensive technical guide (1000-1200 words) about: "${topic.title}".
Keywords: ${topic.keywords.join(", ")}
Target audience: Developers setting up projects on is-pro.dev subdomains.
Style: Technical but accessible, with practical steps, code examples where relevant, and real-world context.
Structure: H2 headings for each section, include an intro paragraph, prerequisites, step-by-step instructions, common pitfalls, best practices, and a conclusion.
Include a FAQ section at the end with 3-4 questions.
Do NOT use placeholder text like "insert your domain here" - use concrete examples.
Do NOT repeat the title as a section heading (the H1 is already the title).
Generate ONLY the article body content, no metadata, no JSON.`;

  const systemPrompt = `You are a technical writer for is-cool-me, a free developer platform. Write in a clear, authoritative voice. Use concrete examples with real subdomain examples like "myproject.is-pro.dev". Avoid filler, repetition, and generic intros. Focus on practical value.`;

  let aiContent = null;
  if (isAiEnabled()) {
    console.log("[ai] Generating guide with AI");
    aiContent = await generateContent(prompt, systemPrompt);
  }
  if (!aiContent) {
    console.log("[ai] Using fallback content for guide");
  }

  const { content, faqs, breadcrumbs } = buildGuideContent(topic, aiContent);

  const readTime = Math.max(8, Math.ceil(content.split(" ").length / 200));
  const today = new Date().toISOString().split("T")[0];

  const headHtml = htmlHead({
    title: `${topic.title} — is-cool-me`,
    description: topic.summary,
    canonical: `${BASE_URL}/guides/${topic.slug}/`,
    ogType: "article",
    article: {
      headline: topic.title,
      description: topic.summary,
      datePublished: today,
      dateModified: today,
      breadcrumbs,
    },
  });

  const headerHtml = headerHTML("/guides/", "is-cool-me");
  const contentHtml =
    guideContentHTML({
      title: topic.title,
      category: topic.category,
      readTime,
      difficulty: topic.difficulty,
      summary: topic.summary,
      content: content.replace(/^/gm, "          "),
      faqs,
      breadcrumbs,
    }) +
    midContentAdHTML() +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);
  const footerHtml = footerHTML();

  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function generateBlogPost(topic) {
  topic.body = BLOG_BODIES[topic.slug] || null;
  console.log(`  Generating blog post: ${topic.slug}`);
  const prompt = `Write a compelling blog post (900-1100 words) about: "${topic.title}".
Keywords: ${topic.keywords.join(", ")}
Style: Thoughtful, well-argued, with personal perspective where appropriate. Should feel like it was written by someone who actually runs a developer platform.
Structure: engaging intro that hooks the reader, body with H2 sections, concrete examples, and a strong conclusion.
Include a FAQ or key takeaways section at the end.
Do NOT use placeholder text. Use real examples.
Generate ONLY the article body content, no metadata.`;

  const systemPrompt = `You are a technical blogger writing for is-cool-me, a free developer platform. Your voice is knowledgeable but approachable. You write about real problems developers face. Use specific examples and avoid generic advice.`;

  let aiContent = null;
  if (isAiEnabled()) {
    console.log("[ai] Generating blog post with AI");
    aiContent = await generateContent(prompt, systemPrompt);
  }
  if (!aiContent) {
    console.log("[ai] Using fallback content for blog post");
  }

  const content =
    aiContent ||
    topic.body ||
    `<h2>Introduction</h2>
<p>${topic.summary}</p>
<h2>The Core Problem</h2>
<p>Developers face a common challenge when building projects: where to host without spending money on domain registration. For side projects, MVPs, and experiments, every dollar counts. This is where free subdomain providers fill a critical gap in the ecosystem.</p>
<h2>Key Insights</h2>
<p>Understanding how DNS works at a practical level changes how you think about deploying projects. It is not just about pointing a domain to an IP address — it is about building reliable infrastructure that scales with your needs.</p>
<p>When you register a subdomain on is-pro.dev, you get access to Cloudflares global DNS network, free SSL certificates, and a dashboard to manage all your records in one place. This combination would cost hundreds of dollars annually with traditional registrars.</p>
<h2>Practical Takeaways</h2>
<ul><li>Start with free infrastructure and upgrade only when you have revenue</li><li>Use subdomains strategically to separate concerns in your project portfolio</li><li>Always configure SSL from day one — it is free and takes 2 minutes</li></ul>
<h2>Conclusion</h2>
<p>The tools available to developers today are remarkably powerful and often free. The key is knowing how to piece them together effectively. Free subdomain providers like is-pro.dev are part of that toolkit.</p>`;

  const faqs = [
    {
      q: "Is is-pro.dev really free to use?",
      a: "Yes, is-pro.dev provides free subdomains for developers with no hidden fees.",
    },
    {
      q: "What can I host on an is-pro.dev subdomain?",
      a: "Any legitimate project — portfolios, SaaS apps, game servers, APIs, and more.",
    },
  ];

  const readTime = Math.max(5, Math.ceil(content.split(" ").length / 200));
  const today = new Date().toISOString().split("T")[0];

  const headHtml = htmlHead({
    title: `${topic.title} — is-cool-me Blog`,
    description: topic.summary,
    canonical: `${BASE_URL}/blog/${topic.slug}/`,
    ogType: "article",
    article: {
      headline: topic.title,
      description: topic.summary,
      datePublished: today,
      dateModified: today,
      breadcrumbs: [
        { name: "Home", href: BASE_URL + "/" },
        { name: "Blog", href: BASE_URL + "/blog/" },
        { name: topic.title, href: BASE_URL + `/blog/${topic.slug}/` },
      ],
    },
  });

  const headerHtml = headerHTML("/blog/", "is-cool-me");
  const contentHtml =
    blogPostContentHTML({
      title: topic.title,
      category: topic.category,
      readTime,
      summary: topic.summary,
      content: content.replace(/^/gm, "          "),
      faqs,
    }) +
    midContentAdHTML() +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);
  const footerHtml = footerHTML();

  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function buildToolWidget(tool) {
  const slug = tool.slug;
  const i = (ph) =>
    `style="flex:1;min-width:200px;padding:.75rem 1rem;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);color:var(--color-text);font-family:var(--font-mono);font-size:.9rem;" placeholder="${ph}"`;
  const btn = (fn, label) =>
    `<button style="padding:.75rem 1.5rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-weight:600;" onclick="${fn}">${label}</button>`;
  const ta = (id, ph, rows, val) =>
    `<textarea id="${id}" placeholder="${ph}" style="width:100%;min-height:${rows}px;padding:.75rem 1rem;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);color:var(--color-text);font-family:var(--font-mono);font-size:.85rem;resize:vertical;">${val || ""}</textarea>`;
  const r = (msg) =>
    `<div id="tool-result" style="margin-top:1rem;font-family:var(--font-mono);font-size:.85rem;color:var(--color-text-muted);min-height:60px;">${msg}</div>`;
  const copyBtn = () =>
    `<button onclick="copyTextarea(this)" style="padding:.5rem 1rem;background:var(--color-accent);color:#fff;border:none;border-radius:var(--radius-md);cursor:pointer;font-size:.8rem;">Copy to Clipboard</button>`;

  const s = (o, v) => `<option value="${o}">${v || o}</option>`;
  const sel = (id, opts) =>
    `<select id="${id}" style="padding:.75rem 1rem;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);color:var(--color-text);font-size:.9rem;">${opts}</select>`;

  const row = (c) =>
    `<div style="display:flex;gap:.75rem;flex-wrap:wrap;">${c}</div>`;
  const col = (c) =>
    `<div style="display:flex;flex-direction:column;gap:.75rem;">${c}</div>`;

  const base = (body, msg) =>
    `<div style="background:var(--color-elevated);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem;margin:1.5rem 0;">${body}${r(msg)}</div>`;

  switch (slug) {
    case "dns-checker":
      return base(
        row(
          `<input ${i("example.com")} />${sel(
            "dns-record-type",
            "A AAAA CNAME MX TXT NS ALL"
              .split(" ")
              .map((t) => s(t))
              .join(""),
          )}${btn("runCheck()", "Lookup")}`,
        ),
        "Enter a domain above and select record type, then click Lookup",
      );
    case "ssl-checker":
      return base(
        row(
          `<input ${i("https://example.com")} />${btn("runCheck()", "Check SSL")}`,
        ),
        "Enter an HTTPS URL above and click Check SSL",
      );
    case "cname-validator":
      return base(
        row(
          `<input ${i("subdomain.example.com")} />${btn("runCheck()", "Check CNAME")}`,
        ),
        "Enter a domain above and click Check CNAME",
      );
    case "http-headers-checker":
      return base(
        row(
          `<input ${i("https://example.com")} />${btn("runCheck()", "Check Headers")}`,
        ),
        "Enter a URL above and click Check Headers",
      );
    case "ip-lookup":
      return base(
        row(
          `<input ${i("8.8.8.8 or domain.com")} />${btn("runCheck()", "Lookup IP")}`,
        ),
        "Enter an IP address or domain above and click Lookup IP",
      );
    case "subdomain-finder":
      return base(
        row(
          `<input ${i("example.com")} />${btn("runCheck()", "Find Subdomains")}`,
        ),
        "Enter a domain above and click Find Subdomains",
      );
    case "opengraph-preview":
      return base(
        row(
          `<input ${i("https://example.com/page")} />${btn("runCheck()", "Preview OG")}`,
        ),
        "Enter a URL above and click Preview OG",
      );
    case "robots-txt-generator":
      return base(
        col(
          `<input type="text" id="rt-user-agent" ${i("User-agent (e.g. * or Googlebot)")} />` +
            `<input type="text" id="rt-allow" ${i("Allow path (e.g. /public/)")} />` +
            `<input type="text" id="rt-disallow" ${i("Disallow path (e.g. /admin/)")} />` +
            `<input type="text" id="rt-sitemap" ${i("Sitemap URL")} />` +
            btn("generateRobotsTxt()", "Generate robots.txt"),
        ),
        "Fill in the fields above and click Generate",
      );
    case "sitemap-validator":
      return base(
        col(
          ta(
            "sitemap-input",
            "Paste your XML sitemap content here...",
            150,
            '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://example.com/</loc>\n  </url>\n</urlset>',
          ) + btn("validateSitemap()", "Validate Sitemap"),
        ),
        "Paste your sitemap XML above and click Validate",
      );
    case "meta-tag-generator":
      return base(
        col(
          `<input type="text" id="meta-title" ${i("Page Title (required)")} />` +
            ta("meta-desc", "Meta Description (required)", 60) +
            `<input type="text" id="meta-url" ${i("Page URL")} />` +
            `<input type="text" id="meta-image" ${i("OG Image URL")} />` +
            `<input type="text" id="meta-sitename" ${i("Site Name")} />` +
            btn("generateMeta()", "Generate Meta Tags"),
        ),
        "Fill in the fields above and click Generate",
      );
    case "json-formatter":
      return base(
        col(
          ta(
            "json-input",
            "Paste your JSON here...",
            150,
            '{"name": "is-cool-me", "tools": ["dns", "ssl", "json"]}',
          ) +
            `<div style="display:flex;gap:.5rem;flex-wrap:wrap;">
            ${btn("formatJSON()", "Format / Validate")}
            ${btn("minifyJSON()", "Minify")}
          </div>`,
        ),
        "Paste JSON above and click Format / Validate",
      );
    case "base64-encoder":
      return base(
        col(
          ta(
            "b64-input",
            "Enter text or Base64 string here...",
            100,
            "Hello, World!",
          ) +
            `<div style="display:flex;gap:.5rem;flex-wrap:wrap;">
            ${btn("encodeBase64()", "Encode → Base64")}
            ${btn("decodeBase64()", "Decode ← Text")}
          </div>`,
        ),
        "Enter text above and click Encode or Decode",
      );
    default:
      return base(
        row(`<input ${i("example.com")} />${btn("runCheck()", "Check")}`),
        "Enter a domain above to see results",
      );
  }
}

function buildToolContent(tool) {
  const widget = buildToolWidget(tool);

  const exampleUses = tool.exampleUses || [
    "Verify your SSL certificate is working before launching a new project",
    "Check DNS propagation after making changes to your subdomain records",
    "Debug configuration issues by comparing expected vs actual results",
    "Monitor the health of your production subdomains",
  ];
  const commonIssues = tool.commonIssues || [
    "<strong>Results not updating:</strong> DNS changes can take up to 5 minutes to propagate globally. If you recently made changes, wait a few minutes and try again.",
    "<strong>SSL errors:</strong> If you see SSL certificate errors, make sure your DNS is pointing to the correct server and that your hosting provider has provisioned a certificate.",
  ];

  return `<h2>Overview</h2>
<p>${tool.description}</p>

<h2>How to Use</h2>
<p>Enter the required information below. Results update in real-time with details about your configuration.</p>

${widget}

<h2>Example Use Cases</h2>
<ul>
${exampleUses.map((u) => `<li>${u}</li>`).join("\n")}
</ul>

<h2>Common Issues</h2>
${commonIssues.map((c) => `<p>${c}</p>`).join("\n")}`;
}

function buildTutorialContent(topic) {
  const st = (step) => `<h2>${step.title}</h2>\n<p>${step.content}</p>`;
  const li = (item) => `<li>${item}</li>`;

  const intro = `<h2>Introduction</h2>\n<p>${topic.summary}</p>`;

  const whatYouNeed = topic.whatYouNeed
    ? `<h2>What You Will Need</h2>\n<ul>\n${topic.whatYouNeed.map(li).join("\n")}\n</ul>`
    : "";

  const steps = topic.steps
    ? topic.steps
        .map((s, i) =>
          st({ title: `Step ${i + 1}: ${s.title}`, content: s.content }),
        )
        .join("\n\n")
    : "";

  const troubleshooting = topic.troubleshooting
    ? `<h2>Troubleshooting</h2>\n${topic.troubleshooting.map((t) => `<p><strong>${t.title}:</strong> ${t.content}</p>`).join("\n")}`
    : "";

  return [intro, whatYouNeed, steps, troubleshooting]
    .filter(Boolean)
    .join("\n\n");
}

function buildCompareContent(topic) {
  const tr = (
    row,
  ) => `<tr style="border-bottom:1px solid var(--color-border-sub);">
<td style="padding:.6rem 0;font-weight:500;">${row.feature}</td>
${row.values.map((v) => `<td style="padding:.6rem 0;">${v}</td>`).join("\n")}
</tr>`;

  const intro = `<h2>Overview</h2>
<p>${topic.summary}</p>`;

  const keyDifferences = topic.platforms
    ? `<h2>Key Differences</h2>
<p>${topic.platforms.join(" and ")} take different approaches to hosting, each with unique strengths. Below is a detailed feature comparison.</p>`
    : "";

  const table = topic.featureRows
    ? `<h2>Feature Comparison</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.9rem;">
<thead>
<tr style="border-bottom:2px solid var(--color-border);">
<th style="text-align:left;padding:.75rem 0;color:var(--color-text-muted);">Feature</th>
${topic.platforms.map((p) => `<th style="text-align:left;padding:.75rem 0;color:var(--color-text-muted);">${p}</th>`).join("\n")}
</tr>
</thead>
<tbody>
${topic.featureRows.map(tr).join("\n")}
</tbody>
</table>`
    : "";

  const chooseWhen = topic.chooseWhen
    ? `<h2>When to Choose Each</h2>
${topic.chooseWhen.map((c) => `<p><strong>Choose ${c.platform}</strong> if ${c.text}</p>`).join("\n")}`
    : "";

  const conclusion = topic.platforms
    ? `<h2>Conclusion</h2>
<p>${topic.platforms.length > 2 ? "All of these platforms" : `Both ${topic.platforms.join(" and ")}`} are excellent choices for hosting projects on is-pro.dev subdomains. The right choice depends on your specific needs — review the table above and pick the platform that aligns best with your project requirements and skill set.</p>`
    : "";

  return [intro, keyDifferences, table, chooseWhen, conclusion]
    .filter(Boolean)
    .join("\n\n");
}

async function generateShowcaseIndex(domains) {
  const featured = domains.slice(0, 6).map((d) =>
    showcaseCardHTML({
      href: `/showcase/${slugify(d.subdomain)}/`,
      title: `${d.subdomain}.is-pro.dev`,
      description: `A ${d.zone} subdomain project by ${d.owner_username || "a developer"}. Explore the project details, screenshots, and links.`,
      category: "Project",
      subdomain: d.subdomain,
    }),
  );

  const categoryCards = SHOWCASE_TOPICS.map((t) =>
    postCardHTML({
      href: `/showcase/category/${t.category}/`,
      title: t.title,
      excerpt: t.description,
      category: t.category,
      tag: t.icon,
      gradient: `linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12))`,
    }),
  );

  const headHtml = htmlHead({
    title: "Developer Showcase — is-cool-me",
    description:
      "Discover amazing projects built by the is-cool-me community. Browse portfolios, apps, tools, and more — all hosted on free is-pro.dev subdomains.",
    canonical: `${BASE_URL}/showcase/`,
  });

  const headerHtml = headerHTML("/showcase/");
  const contentHtml =
    `
  <section class="hero" style="padding:var(--space-16) 0;">
    <div class="container">
      <div class="hero-inner text-center">
        <div class="hero-badge">Community</div>
        <h1>Developer Showcase</h1>
        <p class="hero-subtitle">Discover ${domains.length > 0 ? domains.length + "+" : "amazing"} projects built by the is-cool-me community. From portfolios to SaaS tools, see what is possible with free is-pro.dev subdomains.</p>
        <div class="hero-actions" style="justify-content:center;gap:1rem;margin-top:2rem;">
          <a href="https://dash.is-pro.dev" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Submit Your Project <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="section-header"><h2>Featured Projects</h2></div>
      ${domains.length > 0 ? `<div class="posts-grid" style="margin-top:2rem;">${featured.join("\n")}</div>` : '<p style="color:var(--color-text-muted);margin-top:1rem;">No projects submitted yet. <a href="https://dash.is-pro.dev" style="color:var(--color-accent);">Be the first to submit!</a></p>'}
    </div>
  </section>

  <div class="divider"></div>

  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="section-header"><h2>Browse by Category</h2></div>
      <div class="posts-grid" style="margin-top:2rem;">
        ${categoryCards.join("\n")}
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="section-header"><h2>All Projects</h2></div>
      <div class="posts-grid" style="margin-top:2rem;">
        ${
          domains.length > 0
            ? domains
                .slice(0, 12)
                .map((d) =>
                  showcaseCardHTML({
                    href: `/showcase/${slugify(d.subdomain)}/`,
                    title: `${d.subdomain}.is-pro.dev`,
                    description: `A ${d.zone} subdomain registered ${relativeTime(d.created_at)} by ${d.owner_username || "a developer"}.`,
                    category: "Project",
                    subdomain: d.subdomain,
                  }),
                )
                .join("\n")
            : '<p style="color:var(--color-text-muted);grid-column:1/-1;">No projects yet. <a href="https://dash.is-pro.dev" style="color:var(--color-accent);">Submit the first one!</a></p>'
        }
      </div>
    </div>
  </section>` + internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function generateTrendingPage(domains) {
  const trending = [...domains]
    .sort(() => Math.random() - 0.5)
    .slice(0, 12)
    .map((d) =>
      showcaseCardHTML({
        href: `/showcase/${slugify(d.subdomain)}/`,
        title: `${d.subdomain}.is-pro.dev`,
        description: `Trending ${d.zone} project by ${d.owner_username || "a developer"}`,
        category: "Trending",
        subdomain: d.subdomain,
      }),
    );

  const headHtml = htmlHead({
    title: "Trending Projects — is-cool-me",
    description:
      "See what is hot in the is-cool-me community. Trending projects, rising stars, and popular developer builds on free subdomains.",
    canonical: `${BASE_URL}/trending/`,
  });

  const headerHtml = headerHTML("/trending/");
  const contentHtml =
    `
  <section class="hero" style="padding:var(--space-16) 0;">
    <div class="container">
      <div class="hero-inner text-center">
        <div class="hero-badge">🔥 Hot</div>
        <h1>Trending Projects</h1>
        <p class="hero-subtitle">Discover developers building on is-cool-me. All projects below are online and returning HTTP 200.</p>
      </div>
    </div>
  </section>

  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid">
        ${trending.length > 0 ? trending.join("\n") : '<p style="color:var(--color-text-muted);grid-column:1/-1;">No trending projects yet. <a href="https://dash.is-pro.dev" style="color:var(--color-accent);">Submit your project!</a></p>'}
      </div>
    </div>
  </section>` + internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function generateNewPage(domains) {
  const newest = domains.slice(0, 12).map((d) =>
    showcaseCardHTML({
      href: `/showcase/${slugify(d.subdomain)}/`,
      title: `${d.subdomain}.is-pro.dev`,
      description: `New ${d.zone} subdomain registered by ${d.owner_username || "a developer"}`,
      category: "New",
      subdomain: d.subdomain,
    }),
  );

  const headHtml = htmlHead({
    title: "New Subdomains — is-cool-me",
    description:
      "Recently registered subdomains on is-cool-me. Discover the newest projects from the developer community.",
    canonical: `${BASE_URL}/new/`,
  });

  const headerHtml = headerHTML("/new/");
  const contentHtml =
    `
  <section class="hero" style="padding:var(--space-16) 0;">
    <div class="container">
      <div class="hero-inner text-center">
        <div class="hero-badge">✨ New</div>
        <h1>New Subdomains</h1>
        <p class="hero-subtitle">The latest projects registered on is-cool-me. Welcome the newest members of our developer community.</p>
      </div>
    </div>
  </section>

  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid">
        ${newest.length > 0 ? newest.join("\n") : '<p style="color:var(--color-text-muted);grid-column:1/-1;">No new subdomains yet. <a href="https://dash.is-pro.dev" style="color:var(--color-accent);">Register the first one!</a></p>'}
      </div>
    </div>
  </section>` + internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function generateShowcaseProjectPage(domain) {
  const slug = slugify(domain.subdomain);
  const title = `${domain.subdomain}.is-pro.dev`;

  const headHtml = htmlHead({
    title: `${title} — is-cool-me Showcase`,
    description: `Explore ${title} — a developer project hosted on is-pro.dev. View project details, links, and screenshots.`,
    canonical: `${BASE_URL}/showcase/${slug}/`,
  });

  const headerHtml = headerHTML("/showcase/");
  const contentHtml =
    `
  <section class="hero" style="padding:var(--space-16) 0;">
    <div class="container">
      <div class="hero-inner">
        <nav style="font-size:.85rem;color:var(--color-text-muted);margin-bottom:1rem;" aria-label="Breadcrumb">
          <a href="/showcase/" style="color:var(--color-accent);">← Back to Showcase</a>
        </nav>
        <h1 style="font-size:clamp(1.8rem,4vw,3rem);">${title}</h1>
        <p style="color:var(--color-text-muted);margin-top:.5rem;">Submitted ${relativeTime(domain.created_at)}</p>
        <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">
          <span style="background:var(--color-card);border:1px solid var(--color-border);border-radius:var(--radius-full);padding:.35rem 1rem;font-size:.85rem;">📅 ${relativeTime(domain.created_at)}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="padding:var(--space-8) 0;">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;" class="showcase-grid">
        <div>
          <div style="background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12));border-radius:var(--radius-lg);height:280px;display:flex;align-items:center;justify-content:center;border:1px solid var(--color-border);">
            <div style="text-align:center;color:var(--color-accent-light);">
              <div style="font-size:2.5rem;font-family:var(--font-mono);">${domain.subdomain}</div>
              <div style="font-size:.9rem;color:var(--color-text-muted);margin-top:.5rem;">.${domain.zone}</div>
            </div>
          </div>
        </div>
        <div>
          <h2 style="font-size:1.25rem;margin-bottom:1rem;">Project Details</h2>
          <div style="display:flex;flex-direction:column;gap:.75rem;">
            <div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--color-border-sub);">
              <span style="color:var(--color-text-muted);">Owner</span>
              <span style="font-family:var(--font-mono);font-size:.9rem;">${domain.owner_username || "Unknown"}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--color-border-sub);">
              <span style="color:var(--color-text-muted);">Zone</span>
              <span style="font-family:var(--font-mono);font-size:.9rem;">${domain.zone}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--color-border-sub);">
              <span style="color:var(--color-text-muted);">Registered</span>
              <span style="font-size:.9rem;">${relativeTime(domain.created_at)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--color-border-sub);">
              <span style="color:var(--color-text-muted);">DNS Records</span>
              <span style="font-size:.9rem;">${domain.record_count || 0} records</span>
            </div>
          </div>
          <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap;">
            <a href="https://${domain.subdomain}.${domain.zone}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Visit Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/u/${domain.owner_username || "_"}/" class="btn btn-outline">View Profile</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <style>.showcase-grid@media(max-width:640px){.showcase-grid{grid-template-columns:1fr!important}}</style>` +
    internalLinksHTML(INTERNAL_LINK_SECTIONS) +
    poweredByFooter(slug);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function generateUserProfile(username) {
  const headHtml = htmlHead({
    title: `@${username} — is-cool-me`,
    description: `Developer profile for ${username} on is-cool-me. Explore their projects, stats, and contributions.`,
    canonical: `${BASE_URL}/u/${username}/`,
  });

  const headerHtml = headerHTML(`/u/${username}/`);
  const contentHtml =
    `
  <section class="hero" style="padding:var(--space-16) 0;">
    <div class="container">
      <div class="hero-inner" style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
        <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--color-accent),var(--color-cyan));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#fff;flex-shrink:0;">
          ${username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 style="font-size:1.75rem;">@${username}</h1>
          <p style="color:var(--color-text-muted);margin-top:.25rem;">Member since ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <p style="color:var(--color-text-muted);margin-bottom:2rem;">View and manage projects on the dashboard.</p>

      <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:2rem;">
        <span style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);border-radius:var(--radius-full);padding:.35rem 1rem;font-size:.8rem;color:var(--color-accent-light);">🌟 Early User</span>
        <span style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:var(--radius-full);padding:.35rem 1rem;font-size:.8rem;color:#4ade80;">✅ Verified</span>
      </div>

      <h2 style="font-size:1.25rem;margin-bottom:1rem;">Projects</h2>
      <div class="posts-grid">
        <p style="color:var(--color-text-muted);grid-column:1/-1;">Visit the <a href="https://dash.is-pro.dev" style="color:var(--color-accent);">dashboard</a> to view and manage projects.</p>
      </div>
    </div>
  </section>` + internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function generateToolsPage() {
  const toolCards = TOOL_PAGES.map((t) =>
    postCardHTML({
      href: `/tools/${t.slug}/`,
      title: t.name,
      excerpt: t.description,
      category: t.category,
      tag: t.icon,
      gradient: `linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12))`,
    }),
  );

  const headHtml = htmlHead({
    title: "Free Developer Tools — is-cool-me",
    description:
      "Free browser-based developer tools: DNS checker, SSL checker, robots.txt generator, sitemap validator, OpenGraph preview, meta tag generator, and more.",
    canonical: `${BASE_URL}/tools/`,
  });

  const headerHtml = headerHTML("/tools/");
  const contentHtml =
    pageHeroHTML(
      "Tools",
      "Free Developer Tools",
      "Browser-based utilities for DNS, SSL, SEO, and web development. No signup required.",
    ) +
    `
  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid" style="margin-top:2rem;">
        ${toolCards.join("\n")}
      </div>
    </div>
  </section>` +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function generateToolPage(tool) {
  const content = buildToolContent(tool);

  const headHtml = htmlHead({
    title: `${tool.name} — is-cool-me Tools`,
    description: tool.description,
    canonical: `${BASE_URL}/tools/${tool.slug}/`,
  });

  const headerHtml = headerHTML("/tools/");
  const contentHtml =
    toolPageHTML({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      content: content.replace(/^/gm, "          "),
    }) +
    midContentAdHTML() +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({
    headHtml,
    headerHtml,
    contentHtml,
    footerHtml,
  }).replace("</body>", '<script src="/js/tools.js" defer></script>\n</body>');
}

function generateTutorialsPage() {
  const tutorialCards = TUTORIAL_TOPICS.map((t) =>
    postCardHTML({
      href: `/tutorials/${t.slug}/`,
      title: t.title,
      excerpt: t.summary,
      category: t.category,
      tag: "📚",
      readTime: 15,
      gradient: `linear-gradient(135deg,rgba(6,182,212,0.2),rgba(34,197,94,0.12))`,
    }),
  );

  const headHtml = htmlHead({
    title: "Tutorials — is-cool-me",
    description:
      "Step-by-step tutorials for deploying projects, configuring DNS, and building on is-pro.dev subdomains.",
    canonical: `${BASE_URL}/tutorials/`,
  });

  const headerHtml = headerHTML("/tutorials/");
  const contentHtml =
    pageHeroHTML(
      "Tutorials",
      "Step-by-Step Guides",
      "Hands-on tutorials with code examples and real-world deployment scenarios.",
    ) +
    `
  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid" style="margin-top:2rem;">
        ${tutorialCards.join("\n")}
      </div>
    </div>
  </section>` +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function generateComparePage() {
  const compareCards = COMPARE_TOPICS.map((t) =>
    postCardHTML({
      href: `/compare/${t.slug}/`,
      title: t.title,
      excerpt: t.summary,
      category: t.category,
      tag: "⚖️",
      gradient: `linear-gradient(135deg,rgba(234,179,8,0.2),rgba(239,68,68,0.1))`,
    }),
  );

  const headHtml = htmlHead({
    title: "Compare Hosting & Tools — is-cool-me",
    description:
      "Compare free hosting platforms, domain providers, DNS services, and developer tools side by side.",
    canonical: `${BASE_URL}/compare/`,
  });

  const headerHtml = headerHTML("/compare/");
  const contentHtml =
    pageHeroHTML(
      "Compare",
      "Platform Comparisons",
      "Side-by-side comparisons of hosting platforms, tools, and services for developer projects.",
    ) +
    `
  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid" style="margin-top:2rem;">
        ${compareCards.join("\n")}
      </div>
    </div>
  </section>` +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function generateGuidesPage() {
  const guideSlugs = readdirSync(join(OUT_DIR, "guides"), {
    withFileTypes: true,
  })
    .filter((d) => d.isDirectory() && d.name !== "index.html")
    .map((d) => d.name);

  const guideCards = guideSlugs.map((slug) => {
    const topic = GUIDE_TOPICS.find((t) => t.slug === slug);
    return postCardHTML({
      href: `/guides/${slug}/`,
      title:
        topic?.title ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      excerpt: topic?.summary || "",
      category: topic?.category || "Guide",
      tag: "📘",
      readTime: topic?.readTime || 12,
      gradient: `linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.12))`,
    });
  });

  const headHtml = htmlHead({
    title: "Guides — is-cool-me",
    description:
      "Technical guides for DNS configuration, subdomain management, SSL setup, deployment, and more.",
    canonical: `${BASE_URL}/guides/`,
  });

  const headerHtml = headerHTML("/guides/");
  const contentHtml =
    pageHeroHTML(
      "Guides",
      "Technical Guides",
      "Step-by-step guides for managing subdomains, configuring DNS, deploying apps, and more.",
    ) +
    `
  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid" style="margin-top:2rem;">
        ${guideCards.join("\n        ")}
      </div>
    </div>
  </section>` +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

function generateBlogPage() {
  const blogSlugs = readdirSync(join(OUT_DIR, "blog"), {
    withFileTypes: true,
  })
    .filter((d) => d.isDirectory() && d.name !== "index.html")
    .map((d) => d.name);

  const blogCards = blogSlugs.map((slug) => {
    const topic = BLOG_TOPICS.find((t) => t.slug === slug);
    return postCardHTML({
      href: `/blog/${slug}/`,
      title:
        topic?.title ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      excerpt: topic?.summary || "",
      category: topic?.category || "Blog",
      tag: "📝",
      readTime: topic?.readTime || 8,
      gradient: `linear-gradient(135deg,rgba(34,197,94,0.15),rgba(139,92,246,0.1))`,
    });
  });

  const headHtml = htmlHead({
    title: "Blog — is-cool-me",
    description:
      "Articles about free subdomains, DNS management, security, deployment, and developer platform insights.",
    canonical: `${BASE_URL}/blog/`,
  });

  const headerHtml = headerHTML("/blog/");
  const contentHtml =
    pageHeroHTML(
      "Blog",
      "Latest Articles",
      "Insights, tutorials, and updates about free subdomains, DNS, and developer infrastructure.",
    ) +
    `
  <section class="section" style="padding:var(--space-12) 0;">
    <div class="container">
      <div class="posts-grid" style="margin-top:2rem;">
        ${blogCards.join("\n        ")}
      </div>
    </div>
  </section>` +
    internalLinksHTML(INTERNAL_LINK_SECTIONS);

  const footerHtml = footerHTML();
  return articlePageHTML({ headHtml, headerHtml, contentHtml, footerHtml });
}

async function generateSitemap() {
  const urls = [];

  const staticPages = [
    "/",
    "/domains/",
    "/blog/",
    "/guides/",
    "/showcase/",
    "/trending/",
    "/new/",
    "/tools/",
    "/tutorials/",
    "/compare/",
    "/about/",
    "/contact/",
    "/terms/",
    "/privacy/",
    "/abuse-report/",
  ];
  urls.push(
    ...staticPages.map((p) => ({
      loc: BASE_URL + p,
      priority: p === "/" ? "1.0" : "0.8",
      changefreq: "weekly",
    })),
  );

  urls.push({
    loc: BASE_URL + "/guides/",
    priority: "0.9",
    changefreq: "weekly",
  });
  urls.push({
    loc: BASE_URL + "/blog/",
    priority: "0.9",
    changefreq: "weekly",
  });
  urls.push({
    loc: BASE_URL + "/showcase/",
    priority: "0.9",
    changefreq: "daily",
  });

  const allTopics = [
    ...GUIDE_TOPICS,
    ...BLOG_TOPICS,
    ...TUTORIAL_TOPICS,
    ...COMPARE_TOPICS,
  ];
  allTopics.forEach((topic) => {
    const section = GUIDE_TOPICS.includes(topic)
      ? "guides"
      : BLOG_TOPICS.includes(topic)
        ? "blog"
        : TUTORIAL_TOPICS.includes(topic)
          ? "tutorials"
          : "compare";
    urls.push({
      loc: BASE_URL + `/${section}/${topic.slug}/`,
      priority: "0.7",
      changefreq: "monthly",
    });
  });

  TOOL_PAGES.forEach((tool) => {
    urls.push({
      loc: BASE_URL + `/tools/${tool.slug}/`,
      priority: "0.6",
      changefreq: "monthly",
    });
  });

  urls.push({
    loc: BASE_URL + "/tools/",
    priority: "0.8",
    changefreq: "weekly",
  });
  urls.push({
    loc: BASE_URL + "/tutorials/",
    priority: "0.8",
    changefreq: "weekly",
  });
  urls.push({
    loc: BASE_URL + "/compare/",
    priority: "0.8",
    changefreq: "weekly",
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return xml;
}

async function main() {
  const args = process.argv.slice(2);
  const types = args
    .filter((a) => a.startsWith("--type="))
    .map((a) => a.replace("--type=", ""));
  const doAll = args.includes("--all") || types.includes("all");
  const doSitemap = args.includes("--sitemap");
  const doPreview = args.includes("--preview");
  const doPush = args.includes("--push");

  validateEnv();

  console.log("🚀 is-pro.dev Content Generator");
  console.log("================================");

  if (isAiEnabled()) {
    console.log("[ai] AI enabled");
  } else {
    console.log("[ai] AI disabled");
  }

  if (doPreview) {
    console.log("\n📋 Running preview (no writes)...\n");
    console.log("Guides:", GUIDE_TOPICS.length);
    console.log("Blog posts:", BLOG_TOPICS.length);
    console.log("Tutorials:", TUTORIAL_TOPICS.length);
    console.log("Comparisons:", COMPARE_TOPICS.length);
    console.log("Tool pages:", TOOL_PAGES.length);
    const db = readDb();
    console.log("Domains from DB:", db.length);
    console.log("\n✅ Preview complete. Run without --preview to generate.");
    return;
  }

  if (types.length > 0 && !doAll) {
    console.log(`\n📦 Generating: ${types.join(", ")}`);
  } else if (doAll) {
    console.log("\n📦 Generating ALL content...");
  } else {
    console.log(
      "\n📦 Use --all to generate everything, or --type=<section> for specific content.",
    );
    console.log(
      "   Available: --type=guides, --type=blog, --type=showcase, --type=tools, --type=tutorials, --type=compare, --type=profiles",
    );
    console.log("   Or use --sitemap, --preview, --push");
  }

  let db = readDb();
  console.log(`\n📊 Found ${db.length} domains in database`);
  if (db.length > 0) {
    db = await filterOnlineDomains(db);
    console.log(
      `📊 ${db.length} domains returning HTTP 200 will be shown in showcase`,
    );
  }

  if (
    doAll ||
    types.includes("guides") ||
    types.includes("showcase") ||
    types.includes("blog") ||
    types.includes("tools") ||
    types.includes("tutorials") ||
    types.includes("compare") ||
    types.includes("profiles") ||
    types.length === 0
  ) {
    if (isAiEnabled()) {
      const running = await isOllamaRunning();
      if (running) {
        console.log("[ai] Ollama available");
      } else {
        console.log("[ai] Ollama unavailable, will use fallback content");
      }
    } else {
      console.log("[ai] AI not enabled, using fallback content");
    }
  }

  console.log("\n📝 Generating content...\n");

  if (doAll || types.includes("guides") || types.length === 0) {
    console.log("Generating guides...");
    for (const topic of GUIDE_TOPICS) {
      try {
        const html = await generateGuide(topic);
        const outPath = join(OUT_DIR, "guides", topic.slug, "index.html");
        writePage(outPath, html);
        console.log(`  ✅ ${topic.slug}`);
      } catch (err) {
        console.error(`  ❌ ${topic.slug}:`, err.message);
      }
    }
  }

  if (doAll || types.includes("blog") || types.length === 0) {
    console.log("\nGenerating blog posts...");
    for (const topic of BLOG_TOPICS) {
      try {
        const html = await generateBlogPost(topic);
        const outPath = join(OUT_DIR, "blog", topic.slug, "index.html");
        writePage(outPath, html);
        console.log(`  ✅ ${topic.slug}`);
      } catch (err) {
        console.error(`  ❌ ${topic.slug}:`, err.message);
      }
    }
  }

  if (doAll || types.includes("tutorials") || types.length === 0) {
    console.log("\nGenerating tutorials...");
    for (const topic of TUTORIAL_TOPICS) {
      try {
        const today = new Date().toISOString().split("T")[0];
        const headHtml = htmlHead({
          title: `${topic.title} — is-cool-me Tutorials`,
          description: topic.summary,
          canonical: `${BASE_URL}/tutorials/${topic.slug}/`,
        });
        const headerHtml = headerHTML("/tutorials/");
        const contentHtml =
          blogPostContentHTML({
            title: topic.title,
            category: topic.category,
            readTime: 15,
            summary: topic.summary,
            content: buildTutorialContent(topic).replace(/^/gm, "          "),
          }) +
          midContentAdHTML() +
          internalLinksHTML(INTERNAL_LINK_SECTIONS);
        const footerHtml = footerHTML();
        const html = articlePageHTML({
          headHtml,
          headerHtml,
          contentHtml,
          footerHtml,
        });
        const outPath = join(OUT_DIR, "tutorials", topic.slug, "index.html");
        writePage(outPath, html);
        console.log(`  ✅ ${topic.slug}`);
      } catch (err) {
        console.error(`  ❌ ${topic.slug}:`, err.message);
      }
    }
    const html = generateTutorialsPage();
    writePage(join(OUT_DIR, "tutorials", "index.html"), html);
    console.log("  ✅ tutorials index");
  }

  if (doAll || types.includes("compare") || types.length === 0) {
    console.log("\nGenerating comparison pages...");
    for (const topic of COMPARE_TOPICS) {
      try {
        const today = new Date().toISOString().split("T")[0];
        const headHtml = htmlHead({
          title: `${topic.title} — is-cool-me`,
          description: topic.summary,
          canonical: `${BASE_URL}/compare/${topic.slug}/`,
        });
        const headerHtml = headerHTML("/compare/");
        const contentHtml =
          blogPostContentHTML({
            title: topic.title,
            category: topic.category,
            readTime: 10,
            summary: topic.summary,
            content: buildCompareContent(topic).replace(/^/gm, "          "),
          }) +
          midContentAdHTML() +
          internalLinksHTML(INTERNAL_LINK_SECTIONS);
        const footerHtml = footerHTML();
        const html = articlePageHTML({
          headHtml,
          headerHtml,
          contentHtml,
          footerHtml,
        });
        const outPath = join(OUT_DIR, "compare", topic.slug, "index.html");
        writePage(outPath, html);
        console.log(`  ✅ ${topic.slug}`);
      } catch (err) {
        console.error(`  ❌ ${topic.slug}:`, err.message);
      }
    }
    const html = generateComparePage();
    writePage(join(OUT_DIR, "compare", "index.html"), html);
    console.log("  ✅ compare index");
  }

  if (doAll || types.includes("showcase") || types.length === 0) {
    console.log("\nGenerating showcase pages...");
    try {
      const html = await generateShowcaseIndex(db);
      writePage(join(OUT_DIR, "showcase", "index.html"), html);
      console.log("  ✅ showcase index");

      const trendingHtml = await generateTrendingPage(db);
      writePage(join(OUT_DIR, "trending", "index.html"), trendingHtml);
      console.log("  ✅ trending index");

      const newHtml = await generateNewPage(db);
      writePage(join(OUT_DIR, "new", "index.html"), newHtml);
      console.log("  ✅ new index");

      for (const domain of db.slice(0, 50)) {
        try {
          const slug = slugify(domain.subdomain);
          const projectHtml = await generateShowcaseProjectPage(domain);
          writePage(join(OUT_DIR, "showcase", slug, "index.html"), projectHtml);
          console.log(`  ✅ showcase/${slug}`);
        } catch (err) {
          console.error(`  ❌ showcase/${domain.subdomain}:`, err.message);
        }
      }
    } catch (err) {
      console.error("  ❌ Showcase generation error:", err.message);
    }
  }

  if (doAll || types.includes("tools") || types.length === 0) {
    console.log("\nGenerating tools pages...");
    for (const tool of TOOL_PAGES) {
      try {
        const html = generateToolPage(tool);
        const outPath = join(OUT_DIR, "tools", tool.slug, "index.html");
        writePage(outPath, html);
        console.log(`  ✅ tools/${tool.slug}`);
      } catch (err) {
        console.error(`  ❌ tools/${tool.slug}:`, err.message);
      }
    }
    const html = generateToolsPage();
    writePage(join(OUT_DIR, "tools", "index.html"), html);
    console.log("  ✅ tools index");
  }

  if (doAll || types.includes("profiles") || types.length === 0) {
    console.log("\nGenerating user profile pages...");
    const usernames = [
      ...new Set(db.map((d) => d.owner_username).filter(Boolean)),
    ];
    for (const username of usernames.slice(0, 20)) {
      try {
        const html = await generateUserProfile(username);
        const outPath = join(OUT_DIR, "u", username, "index.html");
        writePage(outPath, html);
        console.log(`  ✅ u/${username}`);
      } catch (err) {
        console.error(`  ❌ u/${username}:`, err.message);
      }
    }
  }

  if (doAll || types.length === 0) {
    console.log("\nRegenerating hub pages...");
    writePage(join(OUT_DIR, "guides", "index.html"), generateGuidesPage());
    console.log("  ✅ guides/index.html");
    writePage(join(OUT_DIR, "blog", "index.html"), generateBlogPage());
    console.log("  ✅ blog/index.html");
    writePage(join(OUT_DIR, "tools", "index.html"), generateToolsPage());
    console.log("  ✅ tools/index.html");
  }

  if (doSitemap || doAll) {
    console.log("\nGenerating sitemap...");
    const xml = await generateSitemap();
    writePage(join(OUT_DIR, "sitemap-generated.xml"), xml);
    console.log("  ✅ sitemap-generated.xml");
  }

  console.log("\n✅ Generation complete!");
  console.log(`📁 Output: ${OUT_DIR}`);

  if (doPush) {
    console.log("\n📤 Pushing to GitHub...");
    try {
      process.chdir(OUT_DIR);
      execSync("git add -A", { shell: "/bin/bash" });
      const status = execSync("git status --porcelain", { shell: "/bin/bash" })
        .toString()
        .trim();
      if (status) {
        execSync(
          'git commit -m "chore: auto-generate content via AI [skip ci]"',
          { shell: "/bin/bash" },
        );
        execSync("git push origin main", { shell: "/bin/bash" });
        console.log("✅ Pushed to GitHub. GitHub Pages will deploy shortly.");
      } else {
        console.log("ℹ️ No changes to push.");
      }
    } catch (err) {
      console.error("❌ Push failed:", err.message);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", redact(err.message || String(err)));
  process.exit(1);
});
