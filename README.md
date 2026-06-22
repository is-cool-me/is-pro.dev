# is-pro.dev Website

Official static website for **is-pro.dev**, operated by **is-cool-me**.

This repository hosts the public marketing pages, blog posts, guides, tools, and operational pages for the `is-pro.dev` free subdomain service.

## What's in this repo

- Landing and product pages (`/`, `/domains/`, `/contact/`, etc.)
- Blog index + individual blog articles (60+ articles)
- Guides index + individual guide pages (40+ guides)
- Tools pages, showcase, trending, tutorials, comparisons
- Shared frontend styles and behavior (`css/main.css`, `js/app.js`)
- SEO files (`sitemap.xml`, `robots.txt`, `ads.txt`, `CNAME`)

## Repository structure

```text
.
├── index.html                  # Homepage
├── 404.html                    # Custom 404 page
├── blog/                       # Blog posts (static HTML)
│   ├── index.html
│   └── <slug>/index.html
├── guides/                     # Technical guides (static HTML)
│   ├── index.html
│   └── <slug>/index.html
├── tools/                      # Free developer tools
├── compare/                    # Platform comparisons
├── tutorials/                  # Step-by-step tutorials
├── showcase/                   # Community project showcase
├── trending/                   # Trending subdomains
├── domains/                    # Available domain info
├── new/                        # Recently registered subdomains
├── u/                          # User profiles
├── contact/                    # Contact page
├── about/                      # About page
├── terms/                      # Terms of Service
├── privacy/                    # Privacy Policy
├── editorial-standards/        # Editorial standards
├── abuse-report/               # Abuse reporting
├── css/main.css                # Design tokens, layout, utilities, components
├── js/app.js                   # Scroll reveal, nav, TOC, copy, utilities
├── generator/                  # Content generation system
│   ├── generate.js             # Main generator script
│   ├── content/topics.js       # Topic definitions, keywords, internal links
│   ├── templates/index.js      # HTML template functions
│   └── lib/groq.js             # AI content generation via Groq API
├── dist/                       # Built assets (images, minified CSS/JS)
├── sitemap.xml                 # Auto-generated XML sitemap
├── robots.txt
├── ads.txt
└── CNAME
```

## Content generation

The `generator/` directory contains a Node.js script that generates site content programmatically.

### How it works

1. **Topic definitions** in `generator/content/topics.js` define guides, blog posts, tutorials, comparisons, and tools with title, summary, keywords, and metadata.
2. **Templates** in `generator/templates/index.js` provide reusable HTML components (headers, footers, cards, article layouts).
3. **AI generation** via Groq API (`generator/lib/groq.js`) produces full article content when `AI_ENABLED=true` and `GROQ_API_KEY` are set. Falls back to template-based content when AI is unavailable.

### Commands

```bash
# Generate everything (all sections)
cd generator && node generate.js --all

# Generate specific sections
node generate.js --type=guides
node generate.js --type=blog
node generate.js --type=tools
node generate.js --type=tutorials
node generate.js --type=compare
node generate.js --type=showcase

# Regenerate sitemap only
node generate.js --sitemap

# Preview what would be generated
node generate.js --preview

# Generate and push to GitHub
GH_PAT=your_token node generate.js --all --push
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `AI_ENABLED` | Set to `"true"` to enable Groq AI generation |
| `GROQ_API_KEY` | Groq API key for AI content generation |
| `GROQ_MODEL` | Groq model (default: `llama-3.3-70b-versatile`) |
| `SITE_ROOT` | Output directory root (default: `../is-pro.dev`) |
| `GH_PAT` | GitHub personal access token for `--push` |

## GitHub Actions / CI

The site is auto-generated via GitHub Actions workflow (`.github/workflows/generate-content.yml`):

- Runs on schedule or manually
- Uses Groq API (not local Ollama) for AI content generation
- Generates all content sections and sitemap
- Commits and pushes generated files back to the repository
- Automatically discovers new topic ideas via AI on `--all` runs

## Local development

Because this is a static site, you can preview it with any local HTTP server.

### Option A: Python

```bash
cd /path/to/is-pro.dev
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

### Option B: Node (if installed)

```bash
npx serve .
```

## Content model

### Blog posts

- Located under: `blog/<slug>/index.html`
- Use shared site header/footer and article layout classes
- Include metadata and social sharing links

### Guides

- Located under: `guides/<slug>/index.html`
- Structured similarly to blog articles, with guide-specific metadata
- Includes TOC support and article navigation

## Styling and UI system

All primary styles are in:

- `css/main.css`

Key systems defined there:

- Global design tokens (colors, spacing, radii, typography)
- Shared layout utilities (`.container`, grid helpers)
- Navigation + mobile menu behavior
- Documentation/article prose styling
- Card, hero, TOC, and share component styling

## JavaScript behavior

Shared frontend logic is in:

- `js/app.js`

Implemented behaviors include:

- Scroll reveal animations
- Sticky/scrolled header state
- Mobile navigation toggle
- Reading progress indicator
- Dynamic table-of-contents generation
- Heading anchor links
- Copy-to-clipboard buttons for code blocks

## Editing guidelines

When adding or updating pages:

1. Reuse existing class patterns in `main.css` where possible.
2. Keep navigation/footer consistent across pages.
3. Prefer shared component classes over inline styling.
4. Preserve semantic structure (`header`, `main`, `article`, `nav`, `footer`).
5. Verify behavior on:
   - Mobile widths (<= 768px)
   - Desktop widths (>= 1024px)
   - Long code blocks and long article content

## SEO and metadata checklist

For each new page, ensure:

- Unique `<title>`
- Meaningful `<meta name="description">`
- Correct canonical URL
- Open Graph tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`)
- Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

Also update:

- `sitemap.xml` (for new public URLs)

## Deployment notes

This repository is intended for static hosting (including GitHub Pages-style setups).

- `CNAME` is present for custom domain mapping.
- No server-side runtime is required.

## Contributing

1. Create a focused branch.
2. Keep changes scoped (UI, content, or infra metadata).
3. Validate pages locally in browser before pushing.
4. Prefer incremental PRs for large content updates.

## License

No license file is currently defined in this repository.
If open-source licensing is desired, add a `LICENSE` file and update this section.
