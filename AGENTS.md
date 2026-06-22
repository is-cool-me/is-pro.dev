# Project Agents Guide

This document provides an overview of the is-pro.dev static site for AI agents and developers.

## Project Overview

**is-pro.dev** is the public marketing site for the is-cool-me free subdomain service.
- Static HTML/CSS/JS (no build pipeline required)
- Content hubs: blog posts (60+), guides (40+), tools, tutorials, comparisons, showcase
- SEO-focused metadata and structured content
- Node.js content generator in `generator/` with AI via Groq API

## Tech Stack

- **HTML**: Static pages under top-level routes
- **CSS**: `css/main.css` (design tokens, layout, components)
- **JavaScript**: `js/app.js` (navigation, TOC, scroll reveal, utilities)
- **Generator**: Node.js in `generator/` — `generate.js` + template functions + Groq AI
- **CI**: GitHub Actions workflow auto-generates content and sitemap

## Repository Structure

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
├── tools/
├── compare/
├── tutorials/
├── showcase/
├── trending/
├── domains/
├── new/
├── u/
├── contact/
├── terms/
├── privacy/
├── about/
├── editorial-standards/
├── abuse-report/
├── css/
│   └── main.css
├── js/
│   └── app.js
├── generator/
│   ├── generate.js
│   ├── content/topics.js
│   ├── templates/index.js
│   └── lib/groq.js
├── dist/
├── sitemap.xml
├── robots.txt
└── CNAME
```

## Key Files

- `index.html`: Homepage layout and primary conversion funnel
- `css/main.css`: Design tokens, layout utilities, components
- `js/app.js`: Scroll reveal, header state, nav toggle, TOC, copy buttons
- `sitemap.xml`: Public URL index for SEO (auto-generated)
- `generator/generate.js`: Main content generation script
- `generator/content/topics.js`: Topic definitions with SEO metadata
- `generator/templates/index.js`: Reusable HTML template functions

## Content Generation

The `generator/` directory generates site content programmatically:

- **Topic definitions**: `topics.js` defines guides, blog posts, tutorials, comparisons with title, summary, keywords, category
- **AI generation**: Uses Groq API (`llama-3.3-70b-versatile`) when `AI_ENABLED=true` and `GROQ_API_KEY` is set
- **Fallback**: Template-based content when AI is unavailable (never fails)
- **Run**: `cd generator && node generate.js --all` to regenerate everything
- **Section-specific**: `--type=guides`, `--type=blog`, etc.

## Editing Guidelines

- Reuse existing classes from `css/main.css` before adding new ones
- Keep header/footer consistent across pages
- Preserve semantic structure (`header`, `main`, `article`, `nav`, `footer`)
- Maintain SEO metadata on every page (title, description, canonical, OG/Twitter, keywords)
- Validate layouts on mobile (<=768px) and desktop (>=1024px)

## Local Development

This is a static site. Use any local HTTP server.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Common Tasks

- Add a guide: add entry to `GUIDE_TOPICS` in `generator/content/topics.js`, then `--type=guides`
- Add a blog post: add entry to `BLOG_TOPICS` in `generator/content/topics.js`, then `--type=blog`
- Edit templates: modify `generator/templates/index.js`
- Regenerate sitemap only: `node generate.js --sitemap`
- Fix `formatTitle()`: `generator/generate.js` — update `ACRONYMS` or `ALWAYS_LOWER` sets

## Notes

- `js/app.js` expects elements like `.site-header`, `.nav-toggle`, and optional TOC containers
- Ad scripts (`quge5.com`, AdSense) and analytics (Plausible) are embedded in HTML
- Service worker (`sw.js`) is intentionally disabled (security)
- Google Fonts uses preload pattern to avoid render blocking
- All content pages include `<meta name="keywords">` from topic definitions
