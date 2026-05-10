# is-pro.dev Website

Official static website for **is-cool-me / is-pro.dev**.

This repository hosts the public marketing pages, blog posts, and operational guides for the `is-pro.dev` free subdomain service.

## What’s in this repo

- Landing and product pages (`/`, `/domains/`, `/contact/`, etc.)
- Blog index + individual blog articles
- Guides index + individual guide pages
- Shared frontend styles and behavior
- SEO/supporting static files (`sitemap.xml`, `robots.txt`, `ads.txt`, `CNAME`)

The project is a **static HTML/CSS/JS site** with no framework build pipeline required to run locally.

## Repository structure

```text
.
├── index.html
├── 404.html
├── blog/
│   ├── index.html
│   └── <article-slug>/index.html
├── guides/
│   ├── index.html
│   └── <guide-slug>/index.html
├── domains/
├── contact/
├── terms/
├── privacy/
├── css/
│   └── main.css
├── js/
│   └── app.js
├── dist/
│   ├── css/
│   ├── js/
│   └── images/
├── sitemap.xml
├── robots.txt
└── CNAME
```

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
