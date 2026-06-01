export const GUIDE_TOPICS = [
  {
    slug: 'free-hosting-with-github-pages',
    title: 'Free Hosting with GitHub Pages: Complete Setup Guide',
    category: 'Deployment',
    difficulty: 'Beginner',
    summary: 'Learn how to host your static website for free using GitHub Pages, configure custom domains with is-pro.dev, and set up automatic deployments from your repository.',
    keywords: ['github pages', 'free hosting', 'static site', 'deployment', 'custom domain', 'is-pro.dev'],
    tags: ['GitHub', 'Deployment', 'Free'],
    relatedSlugs: ['github-pages-custom-domain', 'netlify-site-setup', 'cloudflare-dns-setup', 'react-app-custom-domain']
  },
  {
    slug: 'deploy-react-app-to-vercel',
    title: 'Deploy a React App to Vercel with Custom Domain',
    category: 'Deployment',
    difficulty: 'Beginner',
    summary: 'Step-by-step guide to deploying your React application to Vercel, connecting a free is-pro.dev subdomain, and configuring environment variables for production.',
    keywords: ['react', 'vercel', 'deployment', 'javascript', 'custom domain', 'frontend'],
    tags: ['React', 'Vercel', 'Deployment'],
    relatedSlugs: ['free-domain-for-vercel', 'ssl-certificate-setup', 'developer-portfolio-domain']
  },
  {
    slug: 'nextjs-hosting-on-cloudflare-pages',
    title: 'Host Next.js on Cloudflare Pages with Free Subdomain',
    category: 'Deployment',
    difficulty: 'Intermediate',
    summary: 'Complete guide to deploying Next.js applications on Cloudflare Pages, configuring DNS records through is-pro.dev, and enabling edge caching for fast global performance.',
    keywords: ['nextjs', 'cloudflare pages', 'deployment', 'ssr', 'edge', 'dns'],
    tags: ['Next.js', 'Cloudflare', 'Deployment'],
    relatedSlugs: ['cloudflare-dns-setup', 'free-hosting-with-github-pages', 'ssl-certificate-setup']
  },
  {
    slug: 'free-developer-portfolio-hosting',
    title: 'Build and Host a Developer Portfolio for Free',
    category: 'Portfolio',
    difficulty: 'Beginner',
    summary: 'Create a professional developer portfolio using free tools, host it on GitHub Pages or Vercel, and connect it to a custom subdomain from is-pro.dev without spending a dime.',
    keywords: ['portfolio', 'developer', 'free hosting', 'github pages', 'resume', 'personal brand'],
    tags: ['Portfolio', 'Career', 'GitHub'],
    relatedSlugs: ['developer-portfolio-domain', 'free-hosting-with-github-pages', 'github-pages-custom-domain']
  },
  {
    slug: 'dns-records-explained',
    title: 'DNS Records Explained: A-Z Guide for Developers',
    category: 'DNS',
    difficulty: 'Beginner',
    summary: 'Understand every DNS record type — A, AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC, SRV, and CAA — with practical examples and common use cases for subdomain configuration.',
    keywords: ['dns', 'dns records', 'a record', 'cname', 'mx record', 'txt record', 'spf', 'dkim', 'dmarc'],
    tags: ['DNS', 'Fundamentals'],
    relatedSlugs: ['cloudflare-dns-setup', 'custom-email-with-subdomain', 'add-mx-spf-dkim-dmarc-records']
  },
  {
    slug: 'ssl-certificate-setup-guide',
    title: 'SSL Certificate Setup: From Zero to HTTPS Everywhere',
    category: 'Security',
    difficulty: 'Beginner',
    summary: 'Learn how SSL certificates work, configure free auto-renewing certificates through Cloudflare, and ensure every page on your subdomain forces HTTPS with proper redirect rules.',
    keywords: ['ssl', 'https', 'certificate', 'tls', 'security', 'cloudflare'],
    tags: ['SSL', 'Security', 'DNS'],
    relatedSlugs: ['cloudflare-dns-setup', 'free-domain-for-vercel', 'dns-records-explained']
  },
  {
    slug: 'netlify-custom-domain-setup',
    title: 'Netlify Custom Domain Setup with Free Subdomain',
    category: 'Deployment',
    difficulty: 'Beginner',
    summary: 'Connect your is-pro.dev subdomain to a Netlify site, configure DNS records for both root and www variants, and set up automatic HTTPS provisioning through Netlify Lets Encrypt.',
    keywords: ['netlify', 'custom domain', 'dns', 'free hosting', 'static site', 'https'],
    tags: ['Netlify', 'Deployment', 'DNS'],
    relatedSlugs: ['netlify-site-setup', 'ssl-certificate-setup', 'cloudflare-dns-setup']
  },
  {
    slug: 'subdomain-registry-guide',
    title: 'How to Register and Manage Subdomains on is-pro.dev',
    category: 'Platform',
    difficulty: 'Beginner',
    summary: 'Everything you need to know about registering free subdomains on is-pro.dev — from choosing the right subdomain name to configuring DNS records and managing multiple projects.',
    keywords: ['subdomain', 'is-pro.dev', 'registry', 'dns management', 'free domain'],
    tags: ['Platform', 'DNS'],
    relatedSlugs: ['dns-records-explained', 'cloudflare-dns-setup', 'free-hosting-with-github-pages']
  },
  {
    slug: 'api-subdomain-with-aws-lambda',
    title: 'Host an API Endpoint on a Subdomain with AWS Lambda',
    category: 'API',
    difficulty: 'Intermediate',
    summary: 'Use an is-pro.dev subdomain to expose serverless API endpoints built with AWS Lambda and API Gateway, with proper CORS configuration and custom domain routing.',
    keywords: ['aws', 'lambda', 'api gateway', 'serverless', 'api', 'subdomain'],
    tags: ['AWS', 'API', 'Serverless'],
    relatedSlugs: ['dns-records-explained', 'ssl-certificate-setup', 'cloudflare-dns-setup']
  },
  {
    slug: 'cloudflare-proxy-vs-dns-only',
    title: 'Cloudflare Proxy vs DNS-Only: When to Use Each Mode',
    category: 'Security',
    difficulty: 'Intermediate',
    summary: 'Understand the practical differences between Cloudflares proxy (orange cloud) and DNS-only (gray cloud) modes, and learn which to use for different types of subdomains.',
    keywords: ['cloudflare', 'proxy', 'dns', 'cdn', 'performance', 'security'],
    tags: ['Cloudflare', 'Security', 'DNS'],
    relatedSlugs: ['ssl-certificate-setup', 'dns-records-explained', 'cloudflare-dns-setup']
  },
  {
    slug: 'anime-website-hosting-guide',
    title: 'Host an Anime Fan Site or Wiki on a Free Subdomain',
    category: 'Hosting',
    difficulty: 'Beginner',
    summary: 'Deploy an anime information site, wiki, or fan archive using tools like MediaWiki or Hugo, host it for free on GitHub Pages or Cloudflare Pages, and connect it to your is-pro.dev subdomain.',
    keywords: ['anime', 'wiki', 'mediawiki', 'hugo', 'fan site', 'free hosting'],
    tags: ['Anime', 'Hosting', 'Wiki'],
    relatedSlugs: ['free-hosting-with-github-pages', 'netlify-custom-domain-setup', 'cloudflare-dns-setup']
  },
  {
    slug: 'discord-bot-hosting-guide',
    title: 'Host a Discord Bot 24/7 on a Subdomain Endpoint',
    category: 'Bots',
    difficulty: 'Intermediate',
    summary: 'Expose your Discord bot dashboard or webhook endpoint through an is-pro.dev subdomain, configure SSL, and keep your bot running with uptime monitoring and proper DNS routing.',
    keywords: ['discord', 'bot', 'webhook', 'hosting', 'dashboard', 'uptime'],
    tags: ['Discord', 'Bots', 'Hosting'],
    relatedSlugs: ['api-subdomain-with-aws-lambda', 'ssl-certificate-setup', 'dns-records-explained']
  },
  {
    slug: 'static-site-generators-comparison',
    title: 'Static Site Generators Compared: Hugo, Eleventy, Astro',
    category: 'Tools',
    difficulty: 'Beginner',
    summary: 'Compare the most popular static site generators for developer websites — Hugo for speed, Eleventy for simplicity, and Astro for component-based architectures — with deployment recommendations.',
    keywords: ['static site generator', 'hugo', 'eleventy', 'astro', 'jamstack', 'ssg'],
    tags: ['Tools', 'Static Sites'],
    relatedSlugs: ['free-hosting-with-github-pages', 'deploy-react-app-to-vercel', 'nextjs-hosting-on-cloudflare-pages']
  },
  {
    slug: 'custom-email-address-for-domain',
    title: 'Set Up a Custom Email Address Using Your Subdomain',
    category: 'Email',
    difficulty: 'Intermediate',
    summary: 'Create professional email addresses like hello@yourname.is-pro.dev using email forwarding services, configure MX and SPF records, and manage everything from your dashboard.',
    keywords: ['email', 'mx record', 'custom email', 'mail forwarding', 'branding'],
    tags: ['Email', 'DNS'],
    relatedSlugs: ['dns-records-explained', 'ssl-certificate-setup', 'custom-email-with-subdomain']
  },
  {
    slug: 'vps-deployment-with-ssh',
    title: 'Deploy to a VPS Using SSH and a Custom Subdomain',
    category: 'Deployment',
    difficulty: 'Advanced',
    summary: 'Configure a subdomain to point to a VPS server, set up Nginx as a reverse proxy, manage SSL certificates with Certbot, and automate deployments with Git hooks.',
    keywords: ['vps', 'nginx', 'ssh', 'reverse proxy', 'certbot', 'ssl', 'deployment'],
    tags: ['VPS', 'DevOps', 'Deployment'],
    relatedSlugs: ['ssl-certificate-setup', 'dns-records-explained', 'cloudflare-proxy-vs-dns-only']
  },
  {
    slug: 'shopify-store-subdomain',
    title: 'Connect Shopify Store to a Custom Subdomain',
    category: 'E-Commerce',
    difficulty: 'Beginner',
    summary: 'Point a subdomain from is-pro.dev to your Shopify store, configure DNS records for Shopifys CDN, and set up proper SSL to accept payments on your branded store URL.',
    keywords: ['shopify', 'ecommerce', 'store', 'custom domain', 'dns', 'ssl'],
    tags: ['E-Commerce', 'Shopify'],
    relatedSlugs: ['ssl-certificate-setup', 'cloudflare-dns-setup', 'custom-email-address-for-domain']
  },
  {
    slug: 'wordpress-on-free-subdomain',
    title: 'Host WordPress on a Free is-pro.dev Subdomain',
    category: 'CMS',
    difficulty: 'Intermediate',
    summary: 'Deploy a WordPress site using PHP hosting services like 000webhost or by connecting to a VPS, configure your is-pro.dev subdomain for WordPress-specific DNS requirements.',
    keywords: ['wordpress', 'cms', 'php', 'blog', 'subdomain', 'hosting'],
    tags: ['WordPress', 'CMS', 'Hosting'],
    relatedSlugs: ['cloudflare-dns-setup', 'dns-records-explained', 'free-hosting-with-github-pages']
  },
  {
    slug: 'game-server-subdomain-config',
    title: 'Configure Subdomains for Game Servers and Multiplayer',
    category: 'Gaming',
    difficulty: 'Intermediate',
    summary: 'Use SRV records to point game server subdomains to non-standard ports, configure DNS for Minecraft, Valheim, and other game servers hosted on residential or dedicated servers.',
    keywords: ['game server', 'srv record', 'minecraft', 'dns', 'multiplayer', 'srv'],
    tags: ['Gaming', 'DNS'],
    relatedSlugs: ['dns-records-explained', 'cloudflare-dns-setup', 'ssl-certificate-setup']
  },
  {
    slug: 'monitoring-subdomain-health',
    title: 'Set Up Uptime Monitoring for Your Subdomain Services',
    category: 'DevOps',
    difficulty: 'Beginner',
    summary: 'Monitor your subdomains for downtime using free tools like UptimeRobot or Better Stack, configure alerting webhooks, and use the data to maintain a reliable service.',
    keywords: ['monitoring', 'uptime', 'status page', 'alerts', 'devops', 'health check'],
    tags: ['DevOps', 'Monitoring'],
    relatedSlugs: ['dns-records-explained', 'ssl-certificate-setup', 'vps-deployment-with-ssh']
  },
  {
    slug: 'redirect-old-domain-to-new',
    title: 'Redirect an Old Domain to Your New Subdomain Permanently',
    category: 'SEO',
    difficulty: 'Beginner',
    summary: 'Set up 301 permanent redirects to send visitors from an old domain to your new is-pro.dev subdomain while preserving search engine rankings and maintaining analytics.',
    keywords: ['redirect', '301', 'seo', 'migration', 'domain forwarding'],
    tags: ['SEO', 'DNS'],
    relatedSlugs: ['dns-records-explained', 'ssl-certificate-setup', 'cloudflare-dns-setup']
  }
];

export const BLOG_TOPICS = [
  {
    slug: 'why-free-subdomains-matter-for-bootstrappers',
    title: 'Why Free Subdomains Matter for Bootstrappers and Indie Hackers',
    category: 'Opinion',
    summary: 'A personal argument for why free subdomain providers like is-pro.dev are critical infrastructure for the indie hacker ecosystem, enabling anyone to build and ship without upfront costs.',
    keywords: ['bootstrapping', 'indie hacker', 'free tools', 'startup', 'infrastructure']
  },
  {
    slug: 'dns-caching-debugged-once-for-all',
    title: 'DNS Caching: Debugged Once and For All',
    category: 'Technical',
    summary: 'A deep dive into DNS caching at every layer — browser, OS, router, ISP, and authoritative DNS — with concrete steps to flush caches and debug propagation issues in real time.',
    keywords: ['dns', 'caching', 'propagation', 'debug', 'ttl', 'dns flush']
  },
  {
    slug: 'how-we-handle-abuse-without-breaking-legit-users',
    title: 'How We Handle Abuse Reports Without Breaking Legit Users',
    category: 'Operations',
    summary: 'The moderation system behind is-pro.dev — how we detect abuse, handle false positives, balance free speech with platform safety, and keep the majority of users experience uninterrupted.',
    keywords: ['moderation', 'abuse', 'platform safety', 'dns security', 'trust and safety']
  },
  {
    slug: 'readingdnslogs-likeapro',
    title: 'Reading DNS Logs Like a Pro: Common Patterns and Red Flags',
    category: 'Security',
    summary: 'Learn to identify suspicious DNS activity by understanding common log patterns — from normal CNAME chains to signs of domain takeovers, phishing, and brand impersonation.',
    keywords: ['dns logs', 'security', 'phishing', 'threat detection', 'domain security']
  },
  {
    slug: 'free-tools-that-replaced-paid-saas-for-us',
    title: 'The Free Tools That Replaced Paid SaaS for Our Entire Team',
    category: 'Productivity',
    summary: 'A curated list of the free-tier tools we rely on to run is-pro.dev — from DNS management to monitoring, error tracking, and CI/CD — and how to maximize value from each.',
    keywords: ['free tools', 'saas alternatives', 'productivity', 'devops', 'startup stack']
  },
  {
    slug: 'building-a-global-cdn-on-cloudflares-anycast-network',
    title: 'Building a Global CDN on Cloudflares Anycast Network',
    category: 'Infrastructure',
    summary: 'How Cloudflares anycast architecture works under the hood, why it makes subdomains faster globally, and what it means for your sites performance and security.',
    keywords: ['cloudflare', 'cdn', 'anycast', 'performance', 'global infrastructure']
  },
  {
    slug: 'domain-takeover-prevention-checklist',
    title: 'The Domain Takeover Prevention Checklist Every Developer Needs',
    category: 'Security',
    summary: 'A practical security checklist to prevent subdomain takeover vulnerabilities — from proper CNAME validation to ensuring DNS records are deleted when deploying services.',
    keywords: ['security', 'subdomain takeover', 'vulnerability', 'dns safety', 'checklist']
  },
  {
    slug: 'indie-saas-pricing-psychology-for-developers',
    title: 'Indie SaaS Pricing Psychology: What Every Developer Should Know',
    category: 'Business',
    summary: 'How to price your SaaS product when you are competing with free alternatives — understanding value anchoring, the freemium psychological trap, and when free is actually the right model.',
    keywords: ['pricing', 'saas', 'business', 'freemium', 'psychology', 'monetization']
  },
  {
    slug: 'lets-encrypt-vs-cloudflare-flexible-ssl',
    title: "Let's Encrypt vs Cloudflare Flexible SSL: A Practical Comparison",
    category: 'Security',
    summary: "Understanding the real security differences between Let's Encrypt (end-to-end encryption), Cloudflare Full Strict (edge encryption), and Cloudflare Flexible SSL (partial encryption).",
    keywords: ['ssl', 'lets encrypt', 'cloudflare', 'https', 'security comparison']
  },
  {
    slug: 'managing-1000-subdomains-without-losing-your-mind',
    title: 'Managing 1000+ Subdomains Without Losing Your Mind',
    category: 'Operations',
    summary: 'The systems and tools we use at scale to manage thousands of subdomains — from automated DNS provisioning to bulk record updates, monitoring, and expiration management.',
    keywords: ['scale', 'dns management', 'automation', 'operations', 'infrastructure']
  }
];

export const TUTORIAL_TOPICS = [
  {
    slug: 'deploy-create-react-app-to-vercel',
    title: 'Deploy Create React App to Vercel: Complete Walkthrough',
    category: 'Tutorial',
    difficulty: 'Beginner',
    summary: 'Build a Create React App project, push it to GitHub, deploy to Vercel, and connect your free is-pro.dev subdomain — all in under 20 minutes.',
    keywords: ['react', 'create react app', 'vercel', 'deployment tutorial', 'github']
  },
  {
    slug: 'setup-custom-email-for-less-than-5-minutes',
    title: 'Set Up Custom Email Forwarding in Under 5 Minutes',
    category: 'Tutorial',
    difficulty: 'Beginner',
    summary: 'Configure email forwarding on your is-pro.dev subdomain using a free email service, set up MX and SPF records, and start receiving emails at your custom address.',
    keywords: ['email', 'mx records', 'forwarding', 'tutorial', 'dns']
  },
  {
    slug: 'connect-domain-to-webflow-website',
    title: 'Connect Your is-pro.dev Subdomain to a Webflow Site',
    category: 'Tutorial',
    difficulty: 'Beginner',
    summary: 'Link your free subdomain to a Webflow-published site, configure DNS settings for optimal performance, and enable Webflows automatic SSL certificate provisioning.',
    keywords: ['webflow', 'cms', 'website builder', 'tutorial', 'dns']
  },
  {
    slug: 'host-discord-widgets-on-subdomain',
    title: 'Host Custom Discord Widgets and Embeds on a Subdomain',
    category: 'Tutorial',
    difficulty: 'Intermediate',
    summary: 'Create custom Discord embed pages for your server, host them on GitHub Pages connected to your is-pro.dev subdomain, and embed them on your main website.',
    keywords: ['discord', 'widgets', 'embeds', 'tutorial', 'github pages']
  }
];

export const COMPARE_TOPICS = [
  {
    slug: 'github-pages-vs-vercel-vs-netlify',
    title: 'GitHub Pages vs Vercel vs Netlify: Which is Best for Your Project?',
    category: 'Comparison',
    summary: 'Side-by-side comparison of the three most popular free static hosting platforms — covering deployment experience, custom domains, SSL, CI/CD, and when to choose each.',
    keywords: ['github pages', 'vercel', 'netlify', 'comparison', 'hosting', 'static site'],
    relatedSlugs: ['github-pages-vs-netlify', 'vercel-vs-cloudflare-pages']
  },
  {
    slug: 'github-pages-vs-netlify',
    title: 'GitHub Pages vs Netlify: Free Hosting Face-Off',
    category: 'Comparison',
    summary: 'Compare GitHub Pages and Netlify for free static site hosting — features, limitations, custom domain support, CI/CD pipelines, and which projects suit each platform.',
    keywords: ['github pages', 'netlify', 'comparison', 'free hosting', 'static']
  },
  {
    slug: 'vercel-vs-cloudflare-pages',
    title: 'Vercel vs Cloudflare Pages: Edge Deployment Compared',
    category: 'Comparison',
    summary: 'Compare Vercel and Cloudflare Pages for frontend deployment — edge functions, cold starts, free tier limits, DX, and how each handles custom domains and SSL.',
    keywords: ['vercel', 'cloudflare pages', 'edge', 'comparison', 'deployment']
  },
  {
    slug: 'cloudflare-vs-namecheap-dns',
    title: 'Cloudflare DNS vs Namecheap DNS: Performance and Features Compared',
    category: 'Comparison',
    summary: 'Compare Cloudflares DNS service against Namecheap for subdomain management — propagation speed, uptime, API access, security features, and cost.',
    keywords: ['cloudflare', 'namecheap', 'dns', 'comparison', 'dns hosting']
  },
  {
    slug: 'free-domain-providers-compared',
    title: 'Free Domain Providers Compared: Freenom, is-pro.dev, and Alternatives',
    category: 'Comparison',
    summary: 'Review the free subdomain landscape — Freenom, is-pro.dev, and alternatives — comparing reliability, DNS features, SSL support, longevity, and hidden restrictions.',
    keywords: ['free domain', 'freenom', 'comparision', 'subdomain', 'dns']
  }
];

export const TOOL_PAGES = [
  {
    slug: 'dns-checker',
    name: 'DNS Checker',
    category: 'DNS',
    description: 'Check DNS records for any domain or subdomain. Supports A, AAAA, CNAME, MX, TXT, NS, and SRV record lookups with detailed propagation status.',
    icon: '🌐'
  },
  {
    slug: 'ssl-checker',
    name: 'SSL Certificate Checker',
    category: 'Security',
    description: 'Verify SSL certificate status, expiration date, issuer, and encryption strength for any HTTPS domain or subdomain.',
    icon: '🔒'
  },
  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'SEO',
    description: 'Generate a robots.txt file for your website. Customize crawler access rules, sitemaps, and crawl delay directives with a live preview.',
    icon: '🤖'
  },
  {
    slug: 'sitemap-validator',
    name: 'XML Sitemap Validator',
    category: 'SEO',
    description: 'Validate your XML sitemap for SEO completeness. Check for broken URLs, missing lastmod dates, and proper index structure.',
    icon: '🗺️'
  },
  {
    slug: 'opengraph-preview',
    name: 'OpenGraph Preview Tool',
    category: 'SEO',
    description: 'Preview how your page will appear when shared on social media. Test and edit OpenGraph meta tags with real-time preview.',
    icon: '📤'
  },
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'SEO',
    description: 'Generate complete meta tags for SEO — including title, description, keywords, OpenGraph, Twitter Cards, and schema.org structured data.',
    icon: '🏷️'
  },
  {
    slug: 'cname-validator',
    name: 'CNAME Record Validator',
    category: 'DNS',
    description: 'Validate CNAME record configuration and check if a subdomain is properly pointed to its target destination.',
    icon: '✅'
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'Developer',
    description: 'Format, validate, and minify JSON data. Copy-paste any JSON and get a formatted, syntax-highlighted result.',
    icon: '{ }'
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    category: 'Developer',
    description: 'Encode text to Base64 or decode Base64 back to text. Useful for API development, Basic Auth headers, and data encoding.',
    icon: '📊'
  },
  {
    slug: 'http-headers-checker',
    name: 'HTTP Headers Checker',
    category: 'Developer',
    description: 'Check HTTP response headers for any URL. Verify security headers (CSP, HSTS, X-Frame-Options), caching headers, and server information.',
    icon: '📋'
  },
  {
    slug: 'ip-lookup',
    name: 'IP Lookup Tool',
    category: 'Network',
    description: 'Look up IP address information including geolocation, ISP, ASN, and reverse DNS for any public IP address.',
    icon: '📍'
  },
  {
    slug: 'subdomain-finder',
    name: 'Subdomain Finder',
    category: 'DNS',
    description: 'Discover subdomains associated with a domain using common naming patterns and DNS enumeration techniques.',
    icon: '🔍'
  }
];

export const SHOWCASE_CATEGORIES = [
  'portfolio', 'ai', 'tools', 'anime', 'games', 'bots',
  'open-source', 'productivity', 'personal', 'blog', 'startup', 'utilities'
];

export const USER_BADGES = [
  'early-user',
  'trending-creator',
  'top-project',
  'verified',
  'open-source',
  'community-favorite'
];

export const SHOWCASE_TOPICS = [
  { category: 'portfolio', title: 'Developer Portfolios', description: 'Personal websites and developer portfolios hosted on is-pro.dev subdomains', icon: '👨‍💻' },
  { category: 'ai', title: 'AI & Machine Learning', description: 'AI tools, chatbots, and machine learning demos and dashboards', icon: '🤖' },
  { category: 'tools', title: 'Developer Tools', description: 'Browser-based developer utilities, playgrounds, and code sharing tools', icon: '🛠️' },
  { category: 'anime', title: 'Anime & Manga', description: 'Anime fan sites, wikis, trackers, and community platforms', icon: '🎌' },
  { category: 'games', title: 'Games & Entertainment', description: 'Browser games, game launchers, and gaming-related dashboards', icon: '🎮' },
  { category: 'bots', title: 'Bots & Automation', description: 'Discord bots, Telegram bots, and automation dashboards', icon: '🤖' },
  { category: 'open-source', title: 'Open Source Projects', description: 'Community-built open source projects and their documentation sites', icon: '📦' },
  { category: 'productivity', title: 'Productivity', description: 'Note-taking apps, task managers, and efficiency tools', icon: '⚡' },
  { category: 'personal', title: 'Personal Projects', description: 'Blogs, personal websites, and experimental side projects', icon: '🌟' },
  { category: 'blog', title: 'Blogs & Writing', description: 'Personal blogs, technical writing, and editorial platforms', icon: '✍️' },
  { category: 'startup', title: 'Startups & MVPs', description: 'Startup landing pages, product demos, and SaaS MVPs', icon: '🚀' },
  { category: 'utilities', title: 'Utilities', description: 'Calculator, converter, and other useful web-based utilities', icon: '🔧' }
];

export const INTERNAL_LINK_SECTIONS = [
  {
    title: 'Deployment Guides',
    links: [
      { href: '/guides/free-hosting-with-github-pages/', label: 'GitHub Pages Hosting' },
      { href: '/guides/deploy-react-app-to-vercel/', label: 'Deploy to Vercel' },
      { href: '/guides/netlify-custom-domain-setup/', label: 'Netlify Setup' },
      { href: '/guides/nextjs-hosting-on-cloudflare-pages/', label: 'Cloudflare Pages' },
    ]
  },
  {
    title: 'DNS & Security',
    links: [
      { href: '/guides/dns-records-explained/', label: 'DNS Records Guide' },
      { href: '/guides/ssl-certificate-setup-guide/', label: 'SSL Setup' },
      { href: '/guides/cloudflare-dns-setup/', label: 'Cloudflare DNS' },
      { href: '/guides/cloudflare-proxy-vs-dns-only/', label: 'Proxy vs DNS-Only' },
    ]
  },
  {
    title: 'Platform Resources',
    links: [
      { href: '/showcase/', label: 'Project Showcase' },
      { href: '/blog/', label: 'Blog' },
      { href: '/tools/', label: 'Free Tools' },
      { href: '/compare/', label: 'Compare Hosting' },
    ]
  }
];