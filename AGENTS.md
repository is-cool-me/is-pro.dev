# Project Agents Guide

This document provides an overview of the is-pro.dev static site for AI agents and developers.

## Project Overview

**is-pro.dev** is the public marketing site for the is-cool-me free subdomain service.
- Static HTML/CSS/JS (no build pipeline required)
- Content hubs: blog posts, guides, tools, and product pages
- SEO-focused metadata and structured content

## Tech Stack

- **HTML**: Static pages under top-level routes
- **CSS**: `css/main.css` (design tokens, layout, components)
- **JavaScript**: `js/app.js` (navigation, TOC, scroll reveal, utilities)
- **Assets**: `dist/` for built images/CSS/JS, `includes/` for shared fragments

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

## Key Files

- `index.html`: Homepage layout and primary conversion funnel
- `css/main.css`: Design tokens, layout utilities, components
- `js/app.js`: Scroll reveal, header state, nav toggle, TOC, copy buttons
- `sitemap.xml`: Public URL index for SEO

## Editing Guidelines

- Reuse existing classes from `css/main.css` before adding new ones
- Keep header/footer consistent across pages
- Preserve semantic structure (`header`, `main`, `article`, `nav`, `footer`)
- Maintain SEO metadata on every page (title, description, canonical, OG/Twitter)
- Validate layouts on mobile (<=768px) and desktop (>=1024px)

## Local Development

This is a static site. Use any local HTTP server.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Common Tasks

- Add a page: create `/<route>/index.html` and update `sitemap.xml`
- Add a blog post: `blog/<slug>/index.html`
- Add a guide: `guides/<slug>/index.html`

## Notes

- `js/app.js` expects elements like `.site-header`, `.nav-toggle`, and optional TOC containers
- Ads and analytics scripts are embedded in HTML; keep placement intentional
