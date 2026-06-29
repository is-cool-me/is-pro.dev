export const GUIDE_TOPICS = [
  {
    slug: "free-hosting-with-github-pages",
    title: "Free Hosting with GitHub Pages: Complete Setup Guide",
    category: "Deployment",
    difficulty: "Beginner",
    summary:
      "Learn how to host your static website for free using GitHub Pages, configure custom domains with is-cool-me, and set up automatic deployments from your repository.",
    keywords: [
      "github pages",
      "free hosting",
      "static site",
      "deployment",
      "custom domain",
      "is-cool-me",
    ],
    tags: ["GitHub", "Deployment", "Free"],
    relatedSlugs: [
      "github-pages-custom-domain",
      "netlify-site-setup",
      "cloudflare-dns-setup",
      "react-app-custom-domain",
    ],
  },
  {
    slug: "deploy-react-app-to-vercel",
    title: "Deploy a React App to Vercel with Custom Domain",
    category: "Deployment",
    difficulty: "Beginner",
    summary:
      "Step-by-step guide to deploying your React application to Vercel, connecting a free is-cool-me subdomain, and configuring environment variables for production.",
    keywords: [
      "react",
      "vercel",
      "deployment",
      "javascript",
      "custom domain",
      "frontend",
    ],
    tags: ["React", "Vercel", "Deployment"],
    relatedSlugs: [
      "free-domain-for-vercel",
      "ssl-certificate-setup",
      "developer-portfolio-domain",
    ],
  },
  {
    slug: "nextjs-hosting-on-cloudflare-pages",
    title: "Host Next.js on Cloudflare Pages with Free Subdomain",
    category: "Deployment",
    difficulty: "Intermediate",
    summary:
      "Complete guide to deploying Next.js applications on Cloudflare Pages, configuring DNS records through is-cool-me, and enabling edge caching for fast global performance.",
    keywords: [
      "nextjs",
      "cloudflare pages",
      "deployment",
      "ssr",
      "edge",
      "dns",
    ],
    tags: ["Next.js", "Cloudflare", "Deployment"],
    relatedSlugs: [
      "cloudflare-dns-setup",
      "free-hosting-with-github-pages",
      "ssl-certificate-setup",
    ],
  },
  {
    slug: "free-developer-portfolio-hosting",
    title: "Build and Host a Developer Portfolio for Free",
    category: "Portfolio",
    difficulty: "Beginner",
    summary:
      "Create a professional developer portfolio using free tools, host it on GitHub Pages or Vercel, and connect it to a custom subdomain from is-cool-me without spending a dime.",
    keywords: [
      "portfolio",
      "developer",
      "free hosting",
      "github pages",
      "resume",
      "personal brand",
    ],
    tags: ["Portfolio", "Career", "GitHub"],
    relatedSlugs: [
      "developer-portfolio-domain",
      "free-hosting-with-github-pages",
      "github-pages-custom-domain",
    ],
  },
  {
    slug: "dns-records-explained",
    title: "DNS Records Explained: A-Z Guide for Developers",
    category: "DNS",
    difficulty: "Beginner",
    summary:
      "Understand every DNS record type — A, AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC, SRV, and CAA — with practical examples and common use cases for subdomain configuration.",
    keywords: [
      "dns",
      "dns records",
      "a record",
      "cname",
      "mx record",
      "txt record",
      "spf",
      "dkim",
      "dmarc",
    ],
    tags: ["DNS", "Fundamentals"],
    relatedSlugs: [
      "cloudflare-dns-setup",
      "custom-email-with-subdomain",
      "add-mx-spf-dkim-dmarc-records",
    ],
  },
  {
    slug: "ssl-certificate-setup-guide",
    title: "SSL Certificate Setup: From Zero to HTTPS Everywhere",
    category: "Security",
    difficulty: "Beginner",
    summary:
      "Learn how SSL certificates work, configure free auto-renewing certificates through Cloudflare, and ensure every page on your subdomain forces HTTPS with proper redirect rules.",
    keywords: ["ssl", "https", "certificate", "tls", "security", "cloudflare"],
    tags: ["SSL", "Security", "DNS"],
    relatedSlugs: [
      "cloudflare-dns-setup",
      "free-domain-for-vercel",
      "dns-records-explained",
    ],
  },
  {
    slug: "netlify-custom-domain-setup",
    title: "Netlify Custom Domain Setup with Free Subdomain",
    category: "Deployment",
    difficulty: "Beginner",
    summary:
      "Connect your is-cool-me subdomain to a Netlify site, configure DNS records for both root and www variants, and set up automatic HTTPS provisioning through Netlify Lets Encrypt.",
    keywords: [
      "netlify",
      "custom domain",
      "dns",
      "free hosting",
      "static site",
      "https",
    ],
    tags: ["Netlify", "Deployment", "DNS"],
    relatedSlugs: [
      "netlify-site-setup",
      "ssl-certificate-setup",
      "cloudflare-dns-setup",
    ],
  },
  {
    slug: "subdomain-registry-guide",
    title: "How to Register and Manage Subdomains on is-cool-me",
    category: "Platform",
    difficulty: "Beginner",
    summary:
      "Everything you need to know about registering free subdomains on is-cool-me — from choosing the right subdomain name to configuring DNS records and managing multiple projects.",
    keywords: [
      "subdomain",
      "is-cool-me",
      "registry",
      "dns management",
      "free domain",
    ],
    tags: ["Platform", "DNS"],
    relatedSlugs: [
      "dns-records-explained",
      "cloudflare-dns-setup",
      "free-hosting-with-github-pages",
    ],
  },
  {
    slug: "api-subdomain-with-aws-lambda",
    title: "Host an API Endpoint on a Subdomain with AWS Lambda",
    category: "API",
    difficulty: "Intermediate",
    summary:
      "Use an is-cool-me subdomain to expose serverless API endpoints built with AWS Lambda and API Gateway, with proper CORS configuration and custom domain routing.",
    keywords: [
      "aws",
      "lambda",
      "api gateway",
      "serverless",
      "api",
      "subdomain",
    ],
    tags: ["AWS", "API", "Serverless"],
    relatedSlugs: [
      "dns-records-explained",
      "ssl-certificate-setup",
      "cloudflare-dns-setup",
    ],
  },
  {
    slug: "cloudflare-proxy-vs-dns-only",
    title: "Cloudflare Proxy vs DNS-Only: When to Use Each Mode",
    category: "Security",
    difficulty: "Intermediate",
    summary:
      "Understand the practical differences between Cloudflare's proxy (orange cloud) and DNS-only (gray cloud) modes, and learn which to use for different types of subdomains.",
    keywords: ["cloudflare", "proxy", "dns", "cdn", "performance", "security"],
    tags: ["Cloudflare", "Security", "DNS"],
    relatedSlugs: [
      "ssl-certificate-setup",
      "dns-records-explained",
      "cloudflare-dns-setup",
    ],
  },
  {
    slug: "anime-website-hosting-guide",
    title: "Host an Anime Fan Site or Wiki on a Free Subdomain",
    category: "Hosting",
    difficulty: "Beginner",
    summary:
      "Deploy an anime information site, wiki, or fan archive using tools like MediaWiki or Hugo, host it for free on GitHub Pages or Cloudflare Pages, and connect it to your is-cool-me subdomain.",
    keywords: [
      "anime",
      "wiki",
      "mediawiki",
      "hugo",
      "fan site",
      "free hosting",
    ],
    tags: ["Anime", "Hosting", "Wiki"],
    relatedSlugs: [
      "free-hosting-with-github-pages",
      "netlify-custom-domain-setup",
      "cloudflare-dns-setup",
    ],
  },
  {
    slug: "discord-bot-hosting-guide",
    title: "Host a Discord Bot 24/7 on a Subdomain Endpoint",
    category: "Bots",
    difficulty: "Intermediate",
    summary:
      "Expose your Discord bot dashboard or webhook endpoint through an is-cool-me subdomain, configure SSL, and keep your bot running with uptime monitoring and proper DNS routing.",
    keywords: ["discord", "bot", "webhook", "hosting", "dashboard", "uptime"],
    tags: ["Discord", "Bots", "Hosting"],
    relatedSlugs: [
      "api-subdomain-with-aws-lambda",
      "ssl-certificate-setup",
      "dns-records-explained",
    ],
  },
  {
    slug: "static-site-generators-comparison",
    title: "Static Site Generators Compared: Hugo, Eleventy, Astro",
    category: "Tools",
    difficulty: "Beginner",
    summary:
      "Compare the most popular static site generators for developer websites — Hugo for speed, Eleventy for simplicity, and Astro for component-based architectures — with deployment recommendations.",
    keywords: [
      "static site generator",
      "hugo",
      "eleventy",
      "astro",
      "jamstack",
      "ssg",
    ],
    tags: ["Tools", "Static Sites"],
    relatedSlugs: [
      "free-hosting-with-github-pages",
      "deploy-react-app-to-vercel",
      "nextjs-hosting-on-cloudflare-pages",
    ],
  },
  {
    slug: "custom-email-address-for-domain",
    title: "Set Up a Custom Email Address Using Your Subdomain",
    category: "Email",
    difficulty: "Intermediate",
    summary:
      "Create professional email addresses like hello@yourname.is-pro.dev using email forwarding services, configure MX and SPF records, and manage everything from your dashboard.",
    keywords: [
      "email",
      "mx record",
      "custom email",
      "mail forwarding",
      "branding",
    ],
    tags: ["Email", "DNS"],
    relatedSlugs: [
      "dns-records-explained",
      "ssl-certificate-setup",
      "custom-email-with-subdomain",
    ],
  },
  {
    slug: "vps-deployment-with-ssh",
    title: "Deploy to a VPS Using SSH and a Custom Subdomain",
    category: "Deployment",
    difficulty: "Advanced",
    summary:
      "Configure a subdomain to point to a VPS server, set up Nginx as a reverse proxy, manage SSL certificates with Certbot, and automate deployments with Git hooks.",
    keywords: [
      "vps",
      "nginx",
      "ssh",
      "reverse proxy",
      "certbot",
      "ssl",
      "deployment",
    ],
    tags: ["VPS", "DevOps", "Deployment"],
    relatedSlugs: [
      "ssl-certificate-setup",
      "dns-records-explained",
      "cloudflare-proxy-vs-dns-only",
    ],
  },
  {
    slug: "shopify-store-subdomain",
    title: "Connect Shopify Store to a Custom Subdomain",
    category: "E-Commerce",
    difficulty: "Beginner",
    summary:
      "Point a subdomain from is-cool-me to your Shopify store, configure DNS records for Shopifys CDN, and set up proper SSL to accept payments on your branded store URL.",
    keywords: ["shopify", "ecommerce", "store", "custom domain", "dns", "ssl"],
    tags: ["E-Commerce", "Shopify"],
    relatedSlugs: [
      "ssl-certificate-setup",
      "cloudflare-dns-setup",
      "custom-email-address-for-domain",
    ],
  },
  {
    slug: "wordpress-on-free-subdomain",
    title: "Host WordPress on a Free is-cool-me Subdomain",
    category: "CMS",
    difficulty: "Intermediate",
    summary:
      "Deploy a WordPress site using PHP hosting services like 000webhost or by connecting to a VPS, configure your is-cool-me subdomain for WordPress-specific DNS requirements.",
    keywords: ["wordpress", "cms", "php", "blog", "subdomain", "hosting"],
    tags: ["WordPress", "CMS", "Hosting"],
    relatedSlugs: [
      "cloudflare-dns-setup",
      "dns-records-explained",
      "free-hosting-with-github-pages",
    ],
  },
  {
    slug: "game-server-subdomain-config",
    title: "Configure Subdomains for Game Servers and Multiplayer",
    category: "Gaming",
    difficulty: "Intermediate",
    summary:
      "Use SRV records to point game server subdomains to non-standard ports, configure DNS for Minecraft, Valheim, and other game servers hosted on residential or dedicated servers.",
    keywords: [
      "game server",
      "srv record",
      "minecraft",
      "dns",
      "multiplayer",
      "srv",
    ],
    tags: ["Gaming", "DNS"],
    relatedSlugs: [
      "dns-records-explained",
      "cloudflare-dns-setup",
      "ssl-certificate-setup",
    ],
  },
  {
    slug: "monitoring-subdomain-health",
    title: "Set Up Uptime Monitoring for Your Subdomain Services",
    category: "DevOps",
    difficulty: "Beginner",
    summary:
      "Monitor your subdomains for downtime using free tools like UptimeRobot or Better Stack, configure alerting webhooks, and use the data to maintain a reliable service.",
    keywords: [
      "monitoring",
      "uptime",
      "status page",
      "alerts",
      "devops",
      "health check",
    ],
    tags: ["DevOps", "Monitoring"],
    relatedSlugs: [
      "dns-records-explained",
      "ssl-certificate-setup",
      "vps-deployment-with-ssh",
    ],
  },
  {
    slug: "redirect-old-domain-to-new",
    title: "Redirect an Old Domain to Your New Subdomain Permanently",
    category: "SEO",
    difficulty: "Beginner",
    summary:
      "Set up 301 permanent redirects to send visitors from an old domain to your new is-cool-me subdomain while preserving search engine rankings and maintaining analytics.",
    keywords: ["redirect", "301", "seo", "migration", "domain forwarding"],
    tags: ["SEO", "DNS"],
    relatedSlugs: [
      "dns-records-explained",
      "ssl-certificate-setup",
      "cloudflare-dns-setup",
    ],
  },
  {
    slug: "custom-subdomain-setup-for-blog",
    title: "A Step-by-Step Guide to Setting Up a Custom Subdomain for Your Blog",
    difficulty: "Beginner",
    category: "Deployment",
    summary: "Learn how to set up a custom subdomain for your blog with our easy-to-follow guide, covering DNS records and domain configuration. Master the art of custom subdomain setup for your blog.",
    keywords: ["custom subdomain","blog subdomain","subdomain setup","dns configuration","domain management"],
    tags: ["blogging","subdomains","dns"],
    relatedSlugs: [],
  },
  {
    slug: "dns-configuration-for-static-website",
    title: "How to Configure DNS for a Static Website on a Free Hosting Platform",
    difficulty: "Intermediate",
    category: "DNS",
    summary: "Discover how to configure DNS for a static website on a free hosting platform, ensuring seamless integration and optimal performance. Get expert tips on DNS configuration for static websites.",
    keywords: ["dns configuration","static website","free hosting","website deployment","dns management"],
    tags: ["static sites","dns","hosting"],
    relatedSlugs: [],
  },
  {
    slug: "secure-subdomain-setup-for-ecommerce",
    title: "A Step-by-Step Guide to Setting Up a Secure Subdomain for E-commerce",
    difficulty: "Intermediate",
    category: "Security",
    summary: "Learn how to set up a secure subdomain for e-commerce, including DNS configuration and SSL certificate installation. This guide will walk you through the process of creating a secure subdomain for your online store.",
    keywords: ["secure subdomain setup","ecommerce subdomain configuration","subdomain ssl certificate","dns settings for subdomain","subdomain security best practices"],
    tags: ["E-commerce","Subdomain Security","SSL Certificates"],
    relatedSlugs: [],
  },
  {
    slug: "migrate-website-to-free-hosting-with-custom-subdomain",
    title: "How to Migrate Your Website to a Free Hosting Service with a Custom Subdomain",
    difficulty: "Beginner",
    category: "Deployment",
    summary: "Follow this step-by-step guide to migrate your website to a free hosting service with a custom subdomain, including setting up DNS records and configuring your website. This guide will help you move your website to a free hosting service with minimal downtime.",
    keywords: ["free hosting migration","custom subdomain setup","website migration guide","dns configuration for custom subdomain","free hosting services"],
    tags: ["Website Migration","Free Hosting","Custom Subdomain"],
    relatedSlugs: [],
  },
  {
    slug: "setting-up-secure-subdomain-for-ecommerce",
    title: "A Step-by-Step Guide to Setting Up a Secure Subdomain for E-commerce Websites",
    difficulty: "Intermediate",
    category: "Security",
    summary: "Learn how to set up a secure subdomain for your e-commerce website, including DNS configuration and SSL certificate setup, to ensure a safe and trustworthy online shopping experience. Secure subdomains are essential for e-commerce sites.",
    keywords: ["secure subdomain setup","ecommerce website security","dns configuration for ecommerce","ssl certificate for subdomain","subdomain security best practices","ecommerce subdomain configuration"],
    tags: ["E-commerce","Security","Subdomains"],
    relatedSlugs: [],
  },
  {
    slug: "deploy-static-website-to-free-hosting-with-custom-subdomain",
    title: "How to Deploy a Static Website to a Free Hosting Platform with a Custom Subdomain",
    difficulty: "Beginner",
    category: "Deployment",
    summary: "Follow this step-by-step guide to deploy a static website to a free hosting platform with a custom subdomain, including setting up DNS records and configuring the hosting platform. Custom subdomains can enhance your website's professional appearance.",
    keywords: ["free hosting platform","custom subdomain setup","static website deployment","dns records for static website","free website hosting with custom subdomain","static site deployment guide"],
    tags: ["Static Sites","Free Hosting","Deployment"],
    relatedSlugs: [],
  },
  {
    slug: "setting-up-secure-ecommerce-subdomain",
    title: "A Step-by-Step Guide to Setting Up a Secure Subdomain for E-commerce Websites",
    difficulty: "Intermediate",
    category: "Security",
    summary: "Learn how to set up a secure subdomain for your e-commerce website to protect customer data and ensure a safe shopping experience. This guide covers the importance of subdomain security for e-commerce sites.",
    keywords: ["secure subdomain setup","e-commerce subdomain security","subdomain protection for online stores","setting up secure subdomains","subdomain security best practices","ecommerce subdomain configuration"],
    tags: ["E-commerce","Security","Subdomains"],
    relatedSlugs: [],
  },
  {
    slug: "configuring-dns-records-for-website-speed",
    title: "How to Configure DNS Records for a Fast and Reliable Website",
    difficulty: "Beginner",
    category: "DNS",
    summary: "Discover how to configure DNS records to improve your website's speed and reliability. This guide covers the basics of DNS configuration and provides tips for optimizing DNS records for better website performance.",
    keywords: ["dns record configuration","website speed optimization","dns settings for reliability","configuring dns for fast website","dns optimization techniques","improving website performance with dns"],
    tags: ["DNS","Performance","Website Speed"],
    relatedSlugs: [],
  },
  {
    slug: "setting-up-secure-ecommerce-subdomains",
    title: "A Step-by-Step Guide to Setting Up a Secure Subdomain for E-commerce Websites",
    difficulty: "Intermediate",
    category: "Security",
    summary: "Learn how to set up a secure subdomain for e-commerce websites to protect customer data and prevent cyber threats, focusing on subdomain security and e-commerce website protection.",
    keywords: ["secure subdomain setup","e-commerce website security","subdomain protection","cyber threat prevention","online shopping safety"],
    tags: ["E-commerce","Subdomain Security","Online Safety"],
    relatedSlugs: [],
  },
  {
    slug: "deploying-static-websites-to-free-hosting",
    title: "Deploying a Static Website to Free Hosting with a Custom Subdomain: A Tutorial",
    difficulty: "Beginner",
    category: "Deployment",
    summary: "Follow this step-by-step guide to deploy a static website to free hosting with a custom subdomain, covering DNS configuration and website deployment.",
    keywords: ["static website deployment","free hosting with custom subdomain","DNS configuration for static websites","website deployment tutorial","custom subdomain setup"],
    tags: ["Static Websites","Free Hosting","Deployment Tutorial"],
    relatedSlugs: [],
  },
  {
    slug: "secure-ecommerce-subdomain-setup",
    title: "A Step-by-Step Guide to Setting Up a Secure Subdomain for E-commerce Websites",
    difficulty: "Intermediate",
    category: "Security",
    summary: "Learn how to set up a secure subdomain for e-commerce websites, including DNS configuration and SSL certificates, to protect your online store from cyber threats. This guide covers the main keyword 'secure ecommerce subdomain'.",
    keywords: ["secure ecommerce subdomain","subdomain setup for ecommerce","ecommerce website security","dns configuration for ecommerce","ssl certificates for subdomains"],
    tags: ["E-commerce","Security","Subdomains"],
    relatedSlugs: [],
  },
  {
    slug: "deploy-static-website-to-free-hosting",
    title: "Deploying a Static Website to Free Hosting with a Custom Subdomain: A Beginner's Guide",
    difficulty: "Beginner",
    category: "Deployment",
    summary: "This guide covers the process of deploying a static website to free hosting with a custom subdomain, including setting up DNS records and configuring the hosting platform. The main keyword is 'deploy static website to free hosting'.",
    keywords: ["deploy static website to free hosting","custom subdomain for static website","free hosting for static websites","dns records for static website","static website deployment"],
    tags: ["Static Websites","Free Hosting","Deployment"],
    relatedSlugs: [],
  },
];

export const BLOG_TOPICS = [
  {
    slug: "why-free-subdomains-matter-for-bootstrappers",
    title: "Why Free Subdomains Matter for Bootstrappers and Indie Hackers",
    category: "Opinion",
    summary:
      "A personal argument for why free subdomain providers like is-cool-me are critical infrastructure for the indie hacker ecosystem, enabling anyone to build and ship without upfront costs.",
    keywords: [
      "bootstrapping",
      "indie hacker",
      "free tools",
      "startup",
      "infrastructure",
    ],
  },
  {
    slug: "dns-caching-debugged-once-for-all",
    title: "DNS Caching: Debugged Once and For All",
    category: "Technical",
    summary:
      "A deep dive into DNS caching at every layer — browser, OS, router, ISP, and authoritative DNS — with concrete steps to flush caches and debug propagation issues in real time.",
    keywords: ["dns", "caching", "propagation", "debug", "ttl", "dns flush"],
  },
  {
    slug: "how-we-handle-abuse-without-breaking-legit-users",
    title: "How We Handle Abuse Reports Without Breaking Legit Users",
    category: "Operations",
    summary:
      "The moderation system behind is-cool-me — how we detect abuse, handle false positives, balance free speech with platform safety, and keep the majority of users experience uninterrupted.",
    keywords: [
      "moderation",
      "abuse",
      "platform safety",
      "dns security",
      "trust and safety",
    ],
  },
  {
    slug: "readingdnslogs-likeapro",
    title: "Reading DNS Logs Like a Pro: Common Patterns and Red Flags",
    category: "Security",
    summary:
      "Learn to identify suspicious DNS activity by understanding common log patterns — from normal CNAME chains to signs of domain takeovers, phishing, and brand impersonation.",
    keywords: [
      "dns logs",
      "security",
      "phishing",
      "threat detection",
      "domain security",
    ],
  },
  {
    slug: "free-tools-that-replaced-paid-saas-for-us",
    title: "The Free Tools That Replaced Paid SaaS for Our Entire Team",
    category: "Productivity",
    summary:
      "A curated list of the free-tier tools we rely on to run is-cool-me — from DNS management to monitoring, error tracking, and CI/CD — and how to maximize value from each.",
    keywords: [
      "free tools",
      "saas alternatives",
      "productivity",
      "devops",
      "startup stack",
    ],
  },
  {
    slug: "building-a-global-cdn-on-cloudflares-anycast-network",
    title: "Building a Global CDN on Cloudflare's Anycast Network",
    category: "Infrastructure",
    summary:
      "How Cloudflare's anycast architecture works under the hood, why it makes subdomains faster globally, and what it means for your sites performance and security.",
    keywords: [
      "cloudflare",
      "cdn",
      "anycast",
      "performance",
      "global infrastructure",
    ],
  },
  {
    slug: "domain-takeover-prevention-checklist",
    title: "The Domain Takeover Prevention Checklist Every Developer Needs",
    category: "Security",
    summary:
      "A practical security checklist to prevent subdomain takeover vulnerabilities — from proper CNAME validation to ensuring DNS records are deleted when deploying services.",
    keywords: [
      "security",
      "subdomain takeover",
      "vulnerability",
      "dns safety",
      "checklist",
    ],
  },
  {
    slug: "indie-saas-pricing-psychology-for-developers",
    title: "Indie SaaS Pricing Psychology: What Every Developer Should Know",
    category: "Business",
    summary:
      "How to price your SaaS product when you are competing with free alternatives — understanding value anchoring, the freemium psychological trap, and when free is actually the right model.",
    keywords: [
      "pricing",
      "saas",
      "business",
      "freemium",
      "psychology",
      "monetization",
    ],
  },
  {
    slug: "lets-encrypt-vs-cloudflare-flexible-ssl",
    title: "Let's Encrypt vs Cloudflare Flexible SSL: A Practical Comparison",
    category: "Security",
    summary:
      "Understanding the real security differences between Let's Encrypt (end-to-end encryption), Cloudflare Full Strict (edge encryption), and Cloudflare Flexible SSL (partial encryption).",
    keywords: [
      "ssl",
      "lets encrypt",
      "cloudflare",
      "https",
      "security comparison",
    ],
  },
  {
    slug: "managing-1000-subdomains-without-losing-your-mind",
    title: "Managing 1000+ Subdomains Without Losing Your Mind",
    category: "Operations",
    summary:
      "The systems and tools we use at scale to manage thousands of subdomains — from automated DNS provisioning to bulk record updates, monitoring, and expiration management.",
    keywords: [
      "scale",
      "dns management",
      "automation",
      "operations",
      "infrastructure",
    ],
  },
  {
    slug: "subdomains-for-api-security",
    title: "The Benefits of Using a Subdomain for Your API: Security, Scalability, and More",
    category: "Security",
    summary: "Explore the advantages of using a subdomain for your API, including enhanced security, improved scalability, and better organization. Learn why subdomains are a game-changer for API development.",
    keywords: ["api subdomain","subdomain security","api scalability","api organization","subdomain benefits"],
    tags: ["api development","subdomains","security"],
    relatedSlugs: [],
  },
  {
    slug: "future-of-web-development-with-free-hosting",
    title: "The Future of Web Development: How Free Hosting and Subdomains Are Revolutionizing the Industry",
    category: "Hosting",
    summary: "Examine the impact of free hosting and subdomains on the web development industry, including increased accessibility, reduced costs, and new opportunities for innovation. Discover how free hosting and subdomains are shaping the future of web development.",
    keywords: ["free hosting","subdomains","web development","industry trends","future of web development"],
    tags: ["web development","hosting","trends"],
    relatedSlugs: [],
  },
  {
    slug: "subdomain-vs-custom-domain",
    title: "The Pros and Cons of Using a Subdomain vs a Custom Domain for Your Website or Application",
    category: "Deployment",
    summary: "Weigh the advantages and disadvantages of using a subdomain versus a custom domain for your website or application, considering factors such as branding, SEO, and technical complexity. Make an informed decision about subdomains vs custom domains.",
    keywords: ["subdomain vs custom domain","domain choice","website deployment","application hosting","domain management"],
    tags: ["domains","hosting","deployment"],
    relatedSlugs: [],
  },
  {
    slug: "benefits-of-subdomain-for-api-development",
    title: "The Benefits of Using a Subdomain for API Development and Testing",
    category: "Deployment",
    summary: "Using a subdomain for API development and testing can improve security, organization, and scalability. In this post, we'll explore the benefits of using a subdomain for API development and testing, including improved security and easier maintenance.",
    keywords: ["subdomain for api development","api testing subdomain","benefits of subdomain for api","api security best practices","subdomain configuration for api"],
    tags: ["API Development","Subdomain Benefits","API Testing"],
    relatedSlugs: [],
  },
  {
    slug: "dns-configuration-impact-on-website-performance",
    title: "The Impact of DNS Configuration on Website Performance and Security",
    category: "Performance",
    summary: "DNS configuration can have a significant impact on website performance and security. In this post, we'll explore the importance of DNS configuration and how it can affect your website's performance and security, including page load times and vulnerability to attacks.",
    keywords: ["dns configuration impact","website performance optimization","dns settings for security","dns configuration best practices","website security tips"],
    tags: ["DNS Configuration","Website Performance","Security"],
    relatedSlugs: [],
  },
  {
    slug: "future-of-web-development-free-hosting-subdomains",
    title: "The Future of Web Development: Trends and Predictions for Free Hosting and Subdomains",
    category: "Hosting",
    summary: "The web development landscape is constantly evolving, with new trends and technologies emerging every year. In this post, we'll explore the future of web development, including trends and predictions for free hosting and subdomains, and how they will shape the industry.",
    keywords: ["future of web development","free hosting trends","subdomain predictions","web development trends","free hosting services"],
    tags: ["Web Development","Free Hosting","Future Trends"],
    relatedSlugs: [],
  },
  {
    slug: "benefits-of-subdomain-for-api-development-and-security",
    title: "The Benefits of Using a Subdomain for API Development and Security",
    category: "Security",
    summary: "Using a subdomain for API development can enhance security and organization, making it easier to manage and maintain your APIs. Subdomains for APIs can also improve scalability and flexibility.",
    keywords: ["api subdomain benefits","subdomain for api security","api development best practices","subdomain for api organization","api subdomain advantages","secure api deployment"],
    tags: ["APIs","Security","Subdomains"],
    relatedSlugs: [],
  },
  {
    slug: "dns-configuration-impact-on-website-performance-and-user-experience",
    title: "The Impact of DNS Configuration on Website Performance and User Experience",
    category: "Performance",
    summary: "Proper DNS configuration is crucial for website performance and user experience, as it can affect page load times, server response, and overall site reliability. Optimizing DNS settings can significantly improve website speed and usability.",
    keywords: ["dns configuration for performance","website performance optimization","dns impact on user experience","fast dns settings","dns optimization techniques","website speed improvement"],
    tags: ["DNS","Performance","Optimization"],
    relatedSlugs: [],
  },
  {
    slug: "future-of-web-development-trends-and-opportunities-in-free-hosting-and-subdomains",
    title: "The Future of Web Development: Trends and Opportunities in Free Hosting and Subdomains",
    category: "Hosting",
    summary: "The web development landscape is evolving, with free hosting and subdomains playing a significant role in shaping the future of online applications and services. Emerging trends and opportunities in free hosting and subdomains are transforming the way we build and deploy websites.",
    keywords: ["future of web development","free hosting trends","subdomain opportunities","web development trends","free hosting and subdomains","emerging web technologies"],
    tags: ["Web Development","Free Hosting","Trends"],
    relatedSlugs: [],
  },
  {
    slug: "benefits-of-custom-subdomain-for-blogging",
    title: "The Benefits of Using a Custom Subdomain for Your Blog or Website",
    category: "Deployment",
    summary: "Explore the advantages of using a custom subdomain for your blog or website, including improved branding and organization. Learn how a custom subdomain can enhance your online presence and simplify content management.",
    keywords: ["custom subdomain benefits","subdomain for blogging","custom subdomain advantages","using subdomains for organization","subdomain branding","custom subdomain for website"],
    tags: ["Blogging","Subdomains","Branding"],
    relatedSlugs: [],
  },
  {
    slug: "future-of-web-development-free-hosting-trends",
    title: "The Future of Web Development: Trends and Opportunities in Free Hosting and Subdomains",
    category: "Hosting",
    summary: "Examine the current state of web development and the role of free hosting and subdomains in shaping its future. This blog post discusses emerging trends and opportunities in web development, including the impact of free hosting and subdomains on the industry.",
    keywords: ["free hosting trends","subdomain web development","future of web development","emerging trends in web development","free hosting opportunities","subdomain opportunities"],
    tags: ["Web Development","Free Hosting","Trends"],
    relatedSlugs: [],
  },
  {
    slug: "importance-of-subdomain-security-for-api-protection",
    title: "The Importance of Subdomain Security for API Development and Protection",
    category: "Security",
    summary: "Discuss the significance of subdomain security for API development and protection, including the risks of inadequate security measures. This blog post highlights the need for robust subdomain security to safeguard API data and prevent potential threats.",
    keywords: ["subdomain security for api","api protection measures","importance of subdomain security","api security risks","subdomain security best practices","api subdomain protection"],
    tags: ["API Security","Subdomains","Protection"],
    relatedSlugs: [],
  },
  {
    slug: "future-of-web-development-trends-and-opportunities",
    title: "The Future of Web Development: Trends and Opportunities in Free Hosting and Subdomains",
    category: "Hosting",
    summary: "Explore the latest trends and opportunities in free hosting and subdomains, and how they are shaping the future of web development, including the benefits of subdomains for API development and security.",
    keywords: ["future of web development","free hosting trends","subdomain opportunities","web development trends","subdomain benefits for API development"],
    tags: ["Web Development","Free Hosting","Subdomains"],
    relatedSlugs: [],
  },
  {
    slug: "benefits-of-subdomains-for-api-security-and-development",
    title: "The Benefits of Using Subdomains for API Security and Development",
    category: "Security",
    summary: "Learn about the benefits of using subdomains for API security and development, including improved security, better organization, and enhanced scalability, and discover how to implement subdomains for API development.",
    keywords: ["subdomain benefits for API security","API development with subdomains","subdomain implementation for API development","API security best practices","subdomain advantages for API development"],
    tags: ["API Security","Subdomains","API Development"],
    relatedSlugs: [],
  },
  {
    slug: "subdomains-for-api-development-and-security",
    title: "The Benefits of Using a Subdomain for API Development and Security",
    category: "Security",
    summary: "Using a subdomain for API development and security can provide an additional layer of protection and organization for your APIs, and this blog post explores the benefits of this approach. The main keyword is 'subdomains for api development and security'.",
    keywords: ["subdomains for api development and security","api security best practices","subdomain benefits for api","api development with subdomains","secure api development"],
    tags: ["API Development","Security","Subdomains"],
    relatedSlugs: [],
  },
  {
    slug: "dns-configuration-for-website-performance",
    title: "The Importance of DNS Configuration for Website Performance and User Experience",
    category: "Performance",
    summary: "Proper DNS configuration is crucial for website performance and user experience, and this blog post discusses the importance of DNS configuration and how it can impact your website. The main keyword is 'dns configuration for website performance'.",
    keywords: ["dns configuration for website performance","dns impact on website speed","website performance optimization","dns records for website performance","user experience and dns"],
    tags: ["DNS","Performance","User Experience"],
    relatedSlugs: [],
  },
];

export const TUTORIAL_TOPICS = [
  {
    slug: "deploy-create-react-app-to-vercel",
    title: "Deploy Create React App to Vercel: Complete Walkthrough",
    category: "Tutorial",
    difficulty: "Beginner",
    summary:
      "Build a Create React App project, push it to GitHub, deploy to Vercel, and connect your free is-cool-me subdomain — all in under 20 minutes.",
    keywords: [
      "react",
      "create react app",
      "vercel",
      "deployment tutorial",
      "github",
    ],
    whatYouNeed: [
      "A GitHub account with a Create React App project pushed to a repository",
      "An is-cool-me subdomain (free at dash.is-pro.dev)",
      "A Vercel account (free tier, connect with GitHub)",
      "10-15 minutes of free time",
    ],
    steps: [
      {
        title: "Push Your React App to GitHub",
        content:
          "Initialize a Git repository in your Create React App project, commit all files, create a repository on GitHub, and push your code using <code>git push origin main</code>. Make sure your app builds locally with <code>npm run build</code> before pushing.",
      },
      {
        title: "Import Your Repository into Vercel",
        content:
          'Log in to Vercel and click "Add New &rarr; Project". Select your GitHub repository. Vercel auto-detects Create React App and pre-fills the build command (<code>npm run build</code>) and output directory (<code>build</code>). Click "Deploy" and wait for the initial build to complete.',
      },
      {
        title: "Add Your is-cool-me Subdomain in Vercel",
        content:
          'In your Vercel project dashboard, go to "Settings &rarr; Domains". Enter your is-cool-me subdomain (e.g., <code>myapp.is-pro.dev</code>). Vercel will display a CNAME target like <code>cname.vercel-dns.com</code>. Copy this value.',
      },
      {
        title: "Configure DNS in the is-cool-me Dashboard",
        content:
          "Go to your is-cool-me dashboard, find your subdomain, and add a CNAME record pointing to the Vercel target. Once saved, Cloudflare provisions a free SSL certificate automatically. Propagation is nearly instant through Cloudflare's network.",
      },
      {
        title: "Verify the Deployment",
        content:
          "Visit your subdomain in a browser. You should see your React app loading over HTTPS with a valid certificate. Run Vercel's deployment checks to confirm DNS resolution and SSL are working correctly. If you see a Vercel 404, double-check the CNAME target value.",
      },
    ],
    troubleshooting: [
      {
        title: "Vercel shows a 404",
        content:
          "Your CNAME record may not point to the correct target. Verify the domain settings in Vercel and confirm the DNS record in your is-cool-me dashboard matches exactly.",
      },
      {
        title: "SSL certificate not provisioning",
        content:
          "Cloudflare provisions certificates automatically but may take up to 5 minutes. Ensure your DNS is set to Proxied (orange cloud) in the is-cool-me dashboard.",
      },
      {
        title: "Blank page after deploy",
        content:
          "Check the browser console for errors. Create React App needs the <code>homepage</code> field in <code>package.json</code> if you're using client-side routing on a subdomain.",
      },
    ],
  },
  {
    slug: "setup-custom-email-for-less-than-5-minutes",
    title: "Set Up Custom Email Forwarding in Under 5 Minutes",
    category: "Tutorial",
    difficulty: "Beginner",
    summary:
      "Configure email forwarding on your is-cool-me subdomain using a free email service, set up MX and SPF records, and start receiving emails at your custom address.",
    keywords: ["email", "mx records", "forwarding", "tutorial", "dns"],
    whatYouNeed: [
      "An is-cool-me subdomain (free at dash.is-pro.dev)",
      "A Cloudflare account (free tier, linked to your is-cool-me zone)",
      "An email forwarding service like Cloudflare Email Routing (free) or Forward Email",
      "A personal email inbox to receive forwarded messages",
      "5 minutes of free time",
    ],
    steps: [
      {
        title: "Enable Email Routing in Cloudflare",
        content:
          'Log in to your Cloudflare account and select the is-cool-me zone. Navigate to "Email &rarr; Email Routing" and click "Get started". This feature is free and handles forwarding for up to 100 email addresses per zone.',
      },
      {
        title: "Create a Custom Email Address",
        content:
          'Under Email Routing, click "Addresses". Enter your desired email prefix (e.g., <code>hello</code> for <code>hello@yourname.is-pro.dev</code>). Then enter your destination email address where forwarded emails should arrive. Click "Create" to save.',
      },
      {
        title: "Configure MX Records in DNS",
        content:
          "Cloudflare Email Routing requires specific MX records. In the DNS section of your is-cool-me zone, add the MX records provided by Cloudflare (typically <code>route1.mx.cloudflare.net</code>, <code>route2.mx.cloudflare.net</code>). Set the priority to 10 and 20 respectively.",
      },
      {
        title: "Add SPF Record to Prevent Spoofing",
        content:
          "To prevent your emails from being marked as spam, add a TXT record for your subdomain with the SPF value: <code>v=spf1 include:_spf.mx.cloudflare.net ~all</code>. This authorizes Cloudflare's mail servers to send on your behalf.",
      },
      {
        title: "Test the Forwarding",
        content:
          "Send a test email to your new custom address. It should arrive in your destination inbox within seconds. Check your spam folder if it does not appear. Reply to verify the SPF/DKIM configuration is working correctly.",
      },
    ],
    troubleshooting: [
      {
        title: "Emails not arriving",
        content:
          "Check your MX records in the DNS dashboard. Cloudflare Email Routing also requires that Proxied (orange cloud) is disabled for the MX records — they must be DNS-only (gray cloud).",
      },
      {
        title: "Emails going to spam",
        content:
          'Verify your SPF record is correct and add DKIM signing in the Email Routing dashboard under "Settings &rarr; DKIM". This cryptographically signs your outgoing messages.',
      },
      {
        title: "Forwarding limit reached",
        content:
          "Cloudflare's free tier forwards up to 100 emails per day. For higher volume, consider using a dedicated email service or upgrading your Cloudflare plan.",
      },
    ],
  },
  {
    slug: "connect-domain-to-webflow-website",
    title: "Connect Your is-cool-me Subdomain to a Webflow Site",
    category: "Tutorial",
    difficulty: "Beginner",
    summary:
      "Link your free subdomain to a Webflow-published site, configure DNS settings for optimal performance, and enable Webflows automatic SSL certificate provisioning.",
    keywords: ["webflow", "cms", "website builder", "tutorial", "dns"],
    whatYouNeed: [
      "A Webflow account (free tier works) with a published site",
      "An is-cool-me subdomain (free at dash.is-pro.dev)",
      "Access to the is-cool-me DNS dashboard (Cloudflare-powered)",
      "10 minutes of free time",
    ],
    steps: [
      {
        title: "Publish Your Webflow Site",
        content:
          "In Webflow, publish your site at least once to the default webflow.io staging domain. This generates a working HTTPS endpoint that we will point your subdomain to. Make sure your site design and content are ready before connecting a custom domain.",
      },
      {
        title: "Add Your Subdomain in Webflow",
        content:
          'Go to your Webflow project settings, click the "Publishing" tab, and scroll to "Custom Domains". Click "Add Custom Domain" and enter your is-cool-me subdomain (e.g., <code>mysite.is-pro.dev</code>). Webflow will display a DNS target — either a CNAME or A record values.',
      },
      {
        title: "Configure DNS in the is-cool-me Dashboard",
        content:
          "In your is-cool-me DNS dashboard, add a CNAME record pointing to Webflow's target domain (e.g., <code>proxy-ssl.webflow.com</code>). If Webflow provides A records instead, add those pointing to Webflow's IP addresses. Set proxying to DNS-only (gray cloud) for Webflow compatibility.",
      },
      {
        title: "Enable SSL in Webflow",
        content:
          'Back in Webflow, toggle SSL to "Enabled" for your custom domain. Webflow provisions a Let\'s Encrypt certificate automatically. This process takes 1-5 minutes. Your site will be served over HTTPS once the certificate is active.',
      },
      {
        title: "Publish and Verify",
        content:
          'Click "Publish" in Webflow to push the latest changes. Visit your subdomain to confirm the site loads over HTTPS with the correct content. Check that all assets, forms, and interactions work as expected on the custom domain.',
      },
    ],
    troubleshooting: [
      {
        title: 'Webflow shows "Pending SSL"',
        content:
          "SSL provisioning can take up to 15 minutes with Webflow. Ensure your DNS is set to DNS-only (gray cloud) — proxied (orange cloud) can interfere with Webflow's certificate validation.",
      },
      {
        title: "Site not loading on custom domain",
        content:
          "Verify the DNS record is saving correctly and pointing to Webflow's target. Use the DNS Checker tool on is-cool-me to confirm the record resolves.",
      },
      {
        title: "Mixed content warnings",
        content:
          "If your Webflow site loads resources over HTTP, update all asset URLs to use HTTPS or protocol-relative URLs. Webflow usually handles this automatically when SSL is enabled.",
      },
    ],
  },
  {
    slug: "host-discord-widgets-on-subdomain",
    title: "Host Custom Discord Widgets and Embeds on a Subdomain",
    category: "Tutorial",
    difficulty: "Intermediate",
    summary:
      "Create custom Discord embed pages for your server, host them on GitHub Pages connected to your is-cool-me subdomain, and embed them on your main website.",
    keywords: ["discord", "widgets", "embeds", "tutorial", "github pages"],
    whatYouNeed: [
      "A Discord server with widget settings configured",
      "A GitHub account for hosting the widget page",
      "An is-cool-me subdomain (free at dash.is-pro.dev)",
      "Basic HTML/CSS knowledge",
      "15-20 minutes of free time",
    ],
    steps: [
      {
        title: "Enable Discord Server Widget",
        content:
          'In your Discord server, go to "Server Settings &rarr; Widget". Enable the server widget and copy the <code>serverId</code> from the widget URL (e.g., <code>https://discord.com/widget?id=123456789</code>). This ID is needed to embed live server data.',
      },
      {
        title: "Create the Widget HTML Page",
        content:
          "Create an <code>index.html</code> file with a custom embed layout. Use the Discord Widget API (<code>https://discord.com/api/guilds/{serverId}/widget.json</code>) to fetch live member count, online status, and channel info. Style the page with CSS to match your personal brand or website theme.",
      },
      {
        title: "Deploy to GitHub Pages",
        content:
          'Push the HTML page to a GitHub repository. Go to the repository "Settings &rarr; Pages" and enable GitHub Pages from the <code>main</code> branch. Your widget page will be live at <code>https://{username}.github.io/{repository}/</code>. Verify it loads and displays Discord data correctly.',
      },
      {
        title: "Connect Your is-cool-me Subdomain",
        content:
          "In your is-cool-me DNS dashboard, create a CNAME record pointing your subdomain (e.g., <code>discord.yourname.is-pro.dev</code>) to <code>{username}.github.io</code>. GitHub Pages will recognize the custom domain and provision a Let's Encrypt certificate automatically.",
      },
      {
        title: "Verify and Embed",
        content:
          "Visit your subdomain to confirm the Discord widget loads correctly. Use an <code>&lt;iframe&gt;</code> or <code>&lt;embed&gt;</code> tag on your main website to display the widget page. Test that the member count, online status, and invite button all work from the embedded view.",
      },
    ],
    troubleshooting: [
      {
        title: "CORS errors fetching widget data",
        content:
          "The Discord Widget API does not require authentication. If you see CORS errors, ensure you are using the correct API endpoint and that your widget is enabled in Discord server settings.",
      },
      {
        title: "GitHub Pages not serving custom domain",
        content:
          "Add your is-cool-me subdomain to the GitHub Pages custom domain field in the repository settings. Also ensure your DNS CNAME record has the trailing dot (<code>{username}.github.io.</code>).",
      },
      {
        title: "Widget data not updating",
        content:
          "Discord caches widget data for up to 60 seconds. Your page should use JavaScript to poll the API at regular intervals or on page load to display fresh data.",
      },
    ],
  },
];

export const COMPARE_TOPICS = [
  {
    slug: "github-pages-vs-vercel-vs-netlify",
    title: "GitHub Pages vs Vercel vs Netlify: Which is Best for Your Project?",
    category: "Comparison",
    summary:
      "Side-by-side comparison of the three most popular free static hosting platforms — covering deployment experience, custom domains, SSL, CI/CD, and when to choose each.",
    keywords: [
      "github pages",
      "vercel",
      "netlify",
      "comparison",
      "hosting",
      "static site",
    ],
    relatedSlugs: ["github-pages-vs-netlify", "vercel-vs-cloudflare-pages"],
    platforms: ["GitHub Pages", "Vercel", "Netlify"],
    featureRows: [
      {
        feature: "Free Tier Limits",
        values: [
          "1 GB storage, 100 GB bandwidth/month",
          "100 GB bandwidth, 6000 build min/month",
          "100 GB bandwidth, 300 build min/month",
        ],
      },
      {
        feature: "Custom Domain",
        values: [
          "✅ Supported with CNAME",
          "✅ Supported with CNAME",
          "✅ Supported with CNAME",
        ],
      },
      {
        feature: "SSL Certificate",
        values: [
          "✅ Auto-provisioned (Let's Encrypt)",
          "✅ Auto-provisioned (Let's Encrypt)",
          "✅ Auto-provisioned (Let's Encrypt)",
        ],
      },
      {
        feature: "CI/CD",
        values: [
          "✅ From GitHub only",
          "✅ From Git (auto-deploy)",
          "✅ From Git (auto-deploy)",
        ],
      },
      {
        feature: "Serverless Functions",
        values: [
          "❌ Not available",
          "✅ Edge + Serverless",
          "✅ Serverless functions",
        ],
      },
      {
        feature: "Build Framework Support",
        values: [
          "Jekyll only (auto)",
          "100+ frameworks auto-detect",
          "100+ frameworks auto-detect",
        ],
      },
      {
        feature: "Global CDN",
        values: [
          "✅ Fastly (limited POPs)",
          "✅ Vercel Edge Network",
          "✅ Netlify Edge",
        ],
      },
      {
        feature: "Preview Deployments",
        values: ["❌ Not available", "✅ For every PR", "✅ For every PR"],
      },
    ],
    chooseWhen: [
      {
        platform: "GitHub Pages",
        text: "Choose GitHub Pages if you are hosting a simple static site, a Jekyll blog, or a project documentation page. It is ideal if you want zero configuration and already use GitHub for version control. Avoid it if you need serverless functions, framework auto-detection beyond Jekyll, or preview deployments.",
      },
      {
        platform: "Vercel",
        text: "Choose Vercel if you are deploying a frontend framework like Next.js, React, or Svelte. It excels at SSR, edge functions, and preview deployments for every branch. The generous build minutes make it suitable for active development teams.",
      },
      {
        platform: "Netlify",
        text: "Choose Netlify if you need serverless functions, form handling, and split testing for static sites. Netlify's developer experience is excellent for SPAs and static sites that need backend-like features without managing servers.",
      },
    ],
  },
  {
    slug: "github-pages-vs-netlify",
    title: "GitHub Pages vs Netlify: Free Hosting Face-Off",
    category: "Comparison",
    summary:
      "Compare GitHub Pages and Netlify for free static site hosting — features, limitations, custom domain support, CI/CD pipelines, and which projects suit each platform.",
    keywords: [
      "github pages",
      "netlify",
      "comparison",
      "free hosting",
      "static",
    ],
    platforms: ["GitHub Pages", "Netlify"],
    featureRows: [
      {
        feature: "Free Tier Limits",
        values: [
          "1 GB storage, 100 GB bandwidth/month",
          "100 GB bandwidth, 300 build min/month",
        ],
      },
      {
        feature: "Custom Domain",
        values: ["✅ Supported with CNAME", "✅ Supported with CNAME"],
      },
      {
        feature: "SSL Certificate",
        values: [
          "✅ Auto-provisioned (Let's Encrypt)",
          "✅ Auto-provisioned (Let's Encrypt)",
        ],
      },
      {
        feature: "CI/CD Pipeline",
        values: [
          "✅ From GitHub pushes only",
          "✅ From Git pushes + auto-deploy",
        ],
      },
      {
        feature: "Serverless Functions",
        values: ["❌ Not available", "✅ 125K requests/month"],
      },
      {
        feature: "Build Framework Support",
        values: [
          "Jekyll only (auto); others need manual config",
          "100+ frameworks auto-detected",
        ],
      },
      {
        feature: "Form Handling",
        values: ["❌ Not available", "✅ 100 submissions/month (free)"],
      },
      {
        feature: "Preview Deployments",
        values: ["❌ Not available", "✅ Deploy previews for every PR"],
      },
      {
        feature: "Deploy from Private Repos",
        values: [
          "✅ Free (unlimited private repos)",
          "✅ Free (unlimited private repos)",
        ],
      },
    ],
    chooseWhen: [
      {
        platform: "GitHub Pages",
        text: "Choose GitHub Pages if your project is a simple static site or Jekyll blog hosted on GitHub and you do not need server-side processing. It is the simplest option with zero build configuration for compatible sites.",
      },
      {
        platform: "Netlify",
        text: "Choose Netlify if you need serverless functions, form handling, deploy previews, or support for any static site generator. Netlify's richer feature set makes it better for dynamic-static hybrid sites.",
      },
    ],
  },
  {
    slug: "vercel-vs-cloudflare-pages",
    title: "Vercel vs Cloudflare Pages: Edge Deployment Compared",
    category: "Comparison",
    summary:
      "Compare Vercel and Cloudflare Pages for frontend deployment — edge functions, cold starts, free tier limits, DX, and how each handles custom domains and SSL.",
    keywords: [
      "vercel",
      "cloudflare pages",
      "edge",
      "comparison",
      "deployment",
    ],
    platforms: ["Vercel", "Cloudflare Pages"],
    featureRows: [
      {
        feature: "Free Tier Limits",
        values: [
          "100 GB bandwidth, 6000 build min/month",
          "Unlimited bandwidth, 500 builds/month",
        ],
      },
      {
        feature: "Custom Domain",
        values: ["✅ Supported (CNAME)", "✅ Supported (CNAME)"],
      },
      {
        feature: "SSL Certificate",
        values: [
          "✅ Auto-provisioned (Let's Encrypt)",
          "✅ Auto-provisioned (Cloudflare SSL)",
        ],
      },
      {
        feature: "Edge Functions",
        values: [
          "✅ Vercel Edge Runtime (JavaScript/TypeScript)",
          "✅ Cloudflare Workers (100K req/day free)",
        ],
      },
      {
        feature: "Cold Starts",
        values: [
          "Minimal (Edge Runtime warmed)",
          "Near-zero (Workers isolate)",
        ],
      },
      {
        feature: "Framework Support",
        values: [
          "100+ frameworks auto-detected",
          "35+ frameworks auto-detected",
        ],
      },
      {
        feature: "Analytics",
        values: ["✅ Built-in (free tier limited)", "✅ Web Analytics (free)"],
      },
      {
        feature: "Global POPs",
        values: ["100+ locations", "330+ locations (Cloudflare network)"],
      },
      {
        feature: "Bandwidth Overages",
        values: [
          "Pay-as-you-go after free tier",
          "No overage charges (unlimited)",
        ],
      },
    ],
    chooseWhen: [
      {
        platform: "Vercel",
        text: "Choose Vercel if you are building with Next.js, need framework auto-detection for 100+ frameworks, or prefer Vercel's developer experience with built-in analytics and preview deployments.",
      },
      {
        platform: "Cloudflare Pages",
        text: "Choose Cloudflare Pages if you want unlimited bandwidth, Workers for edge computing, the largest global network (330+ POPs), and integration with other Cloudflare services like D1, R2, and KV.",
      },
    ],
  },
  {
    slug: "cloudflare-vs-namecheap-dns",
    title: "Cloudflare DNS vs Namecheap DNS: Performance and Features Compared",
    category: "Comparison",
    summary:
      "Compare Cloudflare's DNS service against Namecheap for subdomain management — propagation speed, uptime, API access, security features, and cost.",
    keywords: ["cloudflare", "namecheap", "dns", "comparison", "dns hosting"],
    platforms: ["Cloudflare DNS", "Namecheap DNS"],
    featureRows: [
      {
        feature: "Pricing",
        values: [
          "Free (no paid tier required)",
          "Free with domain registration; paid otherwise",
        ],
      },
      {
        feature: "Propagation Speed",
        values: ["Near-instant (< 5 seconds)", "5-30 minutes typical"],
      },
      {
        feature: "Global Network",
        values: ["330+ POPs (Anycast)", "15+ locations (Anycast)"],
      },
      {
        feature: "DDoS Protection",
        values: ["✅ Built-in (free)", "❌ Not included"],
      },
      {
        feature: "API Access",
        values: ["✅ Full REST API (free tier)", "✅ API (limited on free)"],
      },
      {
        feature: "Record Types",
        values: [
          "A, AAAA, CNAME, MX, TXT, NS, SRV, CAA, DS, HTTPS, SVCB",
          "A, AAAA, CNAME, MX, TXT, NS, SRV, CAA, DS",
        ],
      },
      {
        feature: "SSL / TLS",
        values: [
          "✅ Full SSL management + edge certificates",
          "❌ No SSL features",
        ],
      },
      {
        feature: "Email Forwarding",
        values: ["✅ Free (up to 100 addresses)", "❌ Not available"],
      },
      {
        feature: "Analytics",
        values: ["✅ DNS analytics dashboard", "❌ Basic only"],
      },
    ],
    chooseWhen: [
      {
        platform: "Cloudflare DNS",
        text: "Choose Cloudflare DNS if you want the fastest propagation, DDoS protection, free SSL certificates, email forwarding, and DNS analytics — all for free. Cloudflare is the best choice for most developers hosting projects on is-cool-me subdomains.",
      },
      {
        platform: "Namecheap DNS",
        text: "Choose Namecheap DNS if you already manage domains on Namecheap and prefer keeping DNS in the same dashboard. It is reliable for basic DNS management but lacks the security, performance, and free features Cloudflare offers.",
      },
    ],
  },
  {
    slug: "free-domain-providers-compared",
    title:
      "Free Domain Providers Compared: Freenom, is-cool-me, and Alternatives",
    category: "Comparison",
    summary:
      "Review the free subdomain landscape — Freenom, is-cool-me, and alternatives — comparing reliability, DNS features, SSL support, longevity, and hidden restrictions.",
    keywords: ["free domain", "freenom", "comparison", "subdomain", "dns"],
    platforms: [
      "is-cool-me",
      "Freenom",
      "Duck DNS",
      "afraid.org (FreeDNS)",
      "EU.org",
    ],
    featureRows: [
      {
        feature: "Domain Type",
        values: [
          "Subdomain (.is-pro.dev)",
          "Free TLD (.tk, .ml, .ga, .cf)",
          "Subdomain (duckdns.org)",
          "Subdomain (afraid.org subdomain)",
          "Subdomain (.eu.org)",
        ],
      },
      {
        feature: "DNS Management",
        values: [
          "✅ Cloudflare-powered dashboard",
          "✅ Basic DNS panel",
          "✅ Simple API",
          "✅ User-managed NS",
          "✅ Basic DNS",
        ],
      },
      {
        feature: "SSL / HTTPS",
        values: [
          "✅ Free through Cloudflare",
          "❌ No built-in SSL",
          "❌ No built-in SSL",
          "❌ No built-in SSL",
          "❌ No built-in SSL",
        ],
      },
      {
        feature: "Propagation Speed",
        values: [
          "Near-instant (Cloudflare)",
          "Minutes to hours",
          "Minutes to hours",
          "Minutes to hours",
          "Hours to days",
        ],
      },
      {
        feature: "Reliability / Uptime",
        values: [
          "✅ Cloudflare infrastructure",
          "⚠️ Frequent downtime reports",
          "✅ Reliable",
          "⚠️ Community-run",
          "✅ Reliable (non-profit)",
        ],
      },
      {
        feature: "API Access",
        values: [
          "✅ REST API",
          "✅ API available",
          "✅ Simple API",
          "✅ API available",
          "❌ No API",
        ],
      },
      {
        feature: "Ease of Setup",
        values: [
          "✅ Dashboard + CLI",
          "⚠️ Registration friction",
          "✅ Simple script",
          "⚠️ Manual approval needed",
          "⚠️ Long approval (weeks)",
        ],
      },
      {
        feature: "Longevity Risk",
        values: [
          "Low (commercial backing)",
          "High (Freenom discontinued)",
          "Low (stable service)",
          "Medium (community project)",
          "Low (established non-profit)",
        ],
      },
    ],
    chooseWhen: [
      {
        platform: "is-cool-me",
        text: "Choose is-cool-me if you need Cloudflare-powered DNS, free SSL, an easy dashboard, and a reliable subdomain for developer projects. Best for developers who want professional infrastructure without cost.",
      },
      {
        platform: "Freenom",
        text: "Choose Freenom if you specifically need a full TLD (.tk, .ml) for free. However, Freenom has faced reliability issues and domain seizures, making it less suitable for production projects.",
      },
      {
        platform: "Duck DNS or afraid.org",
        text: "Choose Duck DNS or afraid.org if you need a simple free subdomain for home server or IoT projects. They lack built-in SSL and advanced DNS features but work well for personal or experimental use.",
      },
    ],
  },
];

export const TOOL_PAGES = [
  {
    slug: "dns-checker",
    name: "DNS Checker",
    category: "DNS",
    description:
      "Check DNS records for any domain or subdomain. Supports A, AAAA, CNAME, MX, TXT, NS, and SRV record lookups with detailed propagation status.",
    icon: "🌐",
    exampleUses: [
      "Verify DNS records are properly configured after adding a new subdomain",
      "Check MX records before switching email providers to avoid mail loss",
      "Debug propagation delays by comparing records across multiple nameservers",
      "Confirm TXT records (SPF, DKIM, DMARC) are published for email authentication",
    ],
    commonIssues: [
      "<strong>Propagation delays:</strong> Record changes can take 5 minutes to 48 hours to propagate globally depending on TTL settings. Lower TTL before planned changes.",
      "<strong>Missing trailing dot:</strong> Some DNS providers require a trailing dot for fully qualified domain names in record values. Always include it (e.g., <code>example.com.</code>).",
    ],
  },
  {
    slug: "ssl-checker",
    name: "SSL Certificate Checker",
    category: "Security",
    description:
      "Verify SSL certificate status, expiration date, issuer, and encryption strength for any HTTPS domain or subdomain.",
    icon: "🔒",
    exampleUses: [
      "Verify SSL certificate status before launching a new production site",
      "Check expiration dates to prevent certificate-related downtime",
      "Debug mixed content warnings by verifying HTTPS is properly configured",
      "Ensure wildcard certificates cover all required subdomains",
    ],
    commonIssues: [
      "<strong>Certificate expiration:</strong> SSL certificates are valid for a limited time (typically 90 days to 1 year). Set up auto-renewal or calendar reminders to avoid expiration.",
      "<strong>Mixed content:</strong> If your page loads over HTTPS but resources (images, scripts) load over HTTP, browsers will block them. Use relative or HTTPS URLs for all resources.",
    ],
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    category: "SEO",
    description:
      "Generate a robots.txt file for your website. Customize crawler access rules, sitemaps, and crawl delay directives with a live preview.",
    icon: "🤖",
    exampleUses: [
      "Block search crawlers from indexing staging or admin areas",
      "Direct crawlers to your XML sitemap for better indexing",
      "Set crawl delay for high-traffic sites to prevent server overload",
      "Allow or disallow specific user-agents (Googlebot, Bingbot) for targeted SEO",
    ],
    commonIssues: [
      "<strong>Case-sensitive paths:</strong> Robots.txt directives are case-sensitive. Ensure your Allow/Disallow paths match the actual URL casing on your server.",
      "<strong>Separate image crawlers:</strong> Googlebot-Image and Googlebot-Video are distinct user-agents. Add separate rules if you want to control image or video crawling independently.",
    ],
  },
  {
    slug: "sitemap-validator",
    name: "XML Sitemap Validator",
    category: "SEO",
    description:
      "Validate your XML sitemap for SEO completeness. Check for broken URLs, missing lastmod dates, and proper index structure.",
    icon: "🗺️",
    exampleUses: [
      "Verify sitemap XML is well-formed before submitting to Google Search Console",
      "Check all URLs use HTTPS and don't contain broken links",
      "Ensure sitemap follows the standard schema before a site migration",
      "Validate sitemap index files that reference multiple sub-sitemaps",
    ],
    commonIssues: [
      "<strong>XML parsing errors:</strong> Unescaped characters like <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code> in URLs will break XML parsing. Escape them properly or wrap in CDATA sections.",
      "<strong>Too many URLs:</strong> Sitemaps are limited to 50,000 URLs and 50MB uncompressed. Split large sites into a sitemap index with multiple sub-sitemaps.",
    ],
  },
  {
    slug: "opengraph-preview",
    name: "OpenGraph Preview Tool",
    category: "SEO",
    description:
      "Preview how your page will appear when shared on social media. Test and edit OpenGraph meta tags with real-time preview.",
    icon: "📤",
    exampleUses: [
      "Preview how a blog post will appear when shared on Twitter, Slack, or Facebook",
      "Debug missing or incorrect OG tags before sharing a campaign link",
      "Ensure images, titles, and descriptions render correctly across social platforms",
      "Check that dynamically generated pages set proper meta tags for SEO",
    ],
    commonIssues: [
      "<strong>Missing OG image:</strong> Social platforms require a minimum image size (1200\u00d7630 recommended). Without it, your link may show no preview image or a broken thumbnail.",
      "<strong>Truncated descriptions:</strong> Some platforms cap OG descriptions at 155\u2013200 characters. Keep your description concise and include key information early.",
    ],
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "SEO",
    description:
      "Generate complete meta tags for SEO — including title, description, keywords, OpenGraph, Twitter Cards, and schema.org structured data.",
    icon: "🏷️",
    exampleUses: [
      "Generate complete meta tags for a new website or landing page",
      "Ensure all Open Graph and Twitter Card tags are present for social sharing",
      "Create consistent meta tags across multiple pages of a campaign",
      "Quickly build schema-compatible tags for SEO audits without writing HTML",
    ],
    commonIssues: [
      "<strong>Missing OG or Twitter tags:</strong> Social platforms require specific tags (<code>og:image</code>, <code>twitter:card</code>) to render rich previews. Without them, shares show plain text links.",
      "<strong>Duplicate tags:</strong> Multiple <code>&lt;title&gt;</code> or <code>&lt;meta description&gt;</code> tags confuse search engines. Use the generator to produce a clean, non-duplicated set.",
    ],
  },
  {
    slug: "cname-validator",
    name: "CNAME Record Validator",
    category: "DNS",
    description:
      "Validate CNAME record configuration and check if a subdomain is properly pointed to its target destination.",
    icon: "✅",
    exampleUses: [
      "Verify a subdomain CNAME points to the correct target after DNS migration",
      "Debug CDN or reverse-proxy setup by confirming CNAME resolution works",
      "Check custom domain configuration on GitHub Pages, Netlify, or Vercel",
      "Validate old CNAME records have been removed after decommissioning services",
    ],
    commonIssues: [
      "<strong>CNAME at apex:</strong> CNAME records cannot exist at the zone apex (bare domain). Use ALIAS/ANAME records or a CNAME flattening provider instead.",
      "<strong>CNAME conflicts:</strong> A CNAME record cannot coexist with other record types for the same name. Remove conflicting A/AAAA records before adding a CNAME.",
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "Developer",
    description:
      "Format, validate, and minify JSON data. Copy-paste any JSON and get a formatted, syntax-highlighted result.",
    icon: "{ }",
    exampleUses: [
      "Debug API responses by formatting minified JSON into human-readable structure",
      "Validate JSON structure before using it in config files or CI/CD pipelines",
      "Minify JSON payloads to reduce bandwidth when sending data over the wire",
      "Compare differences between JSON objects by formatting them side by side",
    ],
    commonIssues: [
      "<strong>Trailing commas:</strong> JSON does not allow trailing commas in objects or arrays. Remove extra commas after the last element to avoid parse errors.",
      "<strong>Unquoted keys:</strong> JSON requires all object keys to be wrapped in double quotes. Use the validator to find and fix unquoted or single-quoted keys.",
    ],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    category: "Developer",
    description:
      "Encode text to Base64 or decode Base64 back to text. Useful for API development, Basic Auth headers, and data encoding.",
    icon: "📊",
    exampleUses: [
      "Encode credentials for HTTP Basic Authentication headers",
      "Decode Base64 payloads from JWT tokens, API responses, or log files",
      "Transfer binary data as text across systems that only support ASCII",
      "Store small blobs of data in configuration files or environment variables",
    ],
    commonIssues: [
      "<strong>Invalid padding:</strong> Base64 strings require proper padding (<code>=</code> characters). Some implementations accept missing padding, but strict decoders will fail.",
      "<strong>URL-unsafe characters:</strong> Standard Base64 includes <code>+</code> and <code>/</code> which have special meaning in URLs. Use Base64URL encoding for URL-safe transmission.",
    ],
  },
  {
    slug: "http-headers-checker",
    name: "HTTP Headers Checker",
    category: "Developer",
    description:
      "Check HTTP response headers for any URL. Verify security headers (CSP, HSTS, X-Frame-Options), caching headers, and server information.",
    icon: "📋",
    exampleUses: [
      "Audit security headers (CSP, HSTS, X-Frame-Options) before launching a production site",
      "Verify caching headers are set correctly to improve page load performance",
      "Debug CORS issues by inspecting Access-Control-Allow-Origin responses",
      "Confirm your server is running the expected software version for compliance",
    ],
    commonIssues: [
      "<strong>Missing security headers:</strong> Without Content-Security-Policy, X-Frame-Options, and HSTS, your site is vulnerable to common attacks. Add them via your server config or CDN.",
      "<strong>Aggressive caching:</strong> A Cache-Control header with a very long max-age can cause users to see stale content after updates. Use appropriate cache durations for different resource types.",
    ],
  },
  {
    slug: "ip-lookup",
    name: "IP Lookup Tool",
    category: "Network",
    description:
      "Look up IP address information including geolocation, ISP, ASN, and reverse DNS for any public IP address.",
    icon: "📍",
    exampleUses: [
      "Identify geographic location of visitors or servers for compliance analysis",
      "Verify DNS changes propagated to the correct hosting provider",
      "Investigate suspicious IP addresses in access logs for security incidents",
      "Confirm ASN and ISP match your expected hosting provider after migration",
    ],
    commonIssues: [
      "<strong>Private or reserved IPs:</strong> Addresses in ranges like 10.x.x.x, 192.168.x.x, or 127.0.0.1 are not publicly routable and won't return geolocation data.",
      "<strong>API rate limits:</strong> IP geolocation APIs may throttle free tier requests. If you get no results, wait a moment before retrying.",
    ],
  },
  {
    slug: "subdomain-finder",
    name: "Subdomain Finder",
    category: "DNS",
    description:
      "Discover subdomains associated with a domain using common naming patterns and DNS enumeration techniques.",
    icon: "🔍",
    exampleUses: [
      "Discover forgotten or shadow IT subdomains pointing to your domain",
      "Audit your attack surface by finding all publicly resolvable subdomains",
      "Identify subdomains using different hosting providers for consolidation",
      "Check for unauthorized subdomains set up without approval",
    ],
    commonIssues: [
      "<strong>Limited results:</strong> The HackerTarget API returns subdomains discovered from certificate transparency logs and DNS. A domain with few public certificates may return fewer results.",
      "<strong>API rate limits:</strong> If too many requests are made in a short period, the API may temporarily block further queries. Wait a moment before retrying.",
    ],
  },
];

export const SHOWCASE_CATEGORIES = [
  "portfolio",
  "ai",
  "tools",
  "anime",
  "games",
  "bots",
  "open-source",
  "productivity",
  "personal",
  "blog",
  "startup",
  "utilities",
];

export const USER_BADGES = [
  "early-user",
  "trending-creator",
  "top-project",
  "verified",
  "open-source",
  "community-favorite",
];

export const SHOWCASE_TOPICS = [
  {
    category: "portfolio",
    title: "Developer Portfolios",
    description:
      "Personal websites and developer portfolios hosted on is-cool-me subdomains",
    icon: "👨‍💻",
  },
  {
    category: "ai",
    title: "AI & Machine Learning",
    description:
      "AI tools, chatbots, and machine learning demos and dashboards",
    icon: "🤖",
  },
  {
    category: "tools",
    title: "Developer Tools",
    description:
      "Browser-based developer utilities, playgrounds, and code sharing tools",
    icon: "🛠️",
  },
  {
    category: "anime",
    title: "Anime & Manga",
    description: "Anime fan sites, wikis, trackers, and community platforms",
    icon: "🎌",
  },
  {
    category: "games",
    title: "Games & Entertainment",
    description: "Browser games, game launchers, and gaming-related dashboards",
    icon: "🎮",
  },
  {
    category: "bots",
    title: "Bots & Automation",
    description: "Discord bots, Telegram bots, and automation dashboards",
    icon: "🤖",
  },
  {
    category: "open-source",
    title: "Open Source Projects",
    description:
      "Community-built open source projects and their documentation sites",
    icon: "📦",
  },
  {
    category: "productivity",
    title: "Productivity",
    description: "Note-taking apps, task managers, and efficiency tools",
    icon: "⚡",
  },
  {
    category: "personal",
    title: "Personal Projects",
    description: "Blogs, personal websites, and experimental side projects",
    icon: "🌟",
  },
  {
    category: "blog",
    title: "Blogs & Writing",
    description: "Personal blogs, technical writing, and editorial platforms",
    icon: "✍️",
  },
  {
    category: "startup",
    title: "Startups & MVPs",
    description: "Startup landing pages, product demos, and SaaS MVPs",
    icon: "🚀",
  },
  {
    category: "utilities",
    title: "Utilities",
    description: "Calculator, converter, and other useful web-based utilities",
    icon: "🔧",
  },
];

export const INTERNAL_LINK_SECTIONS = [
  {
    title: "Deployment Guides",
    links: [
      {
        href: "/guides/free-hosting-with-github-pages/",
        label: "GitHub Pages Hosting",
      },
      {
        href: "/guides/deploy-react-app-to-vercel/",
        label: "Deploy to Vercel",
      },
      { href: "/guides/netlify-custom-domain-setup/", label: "Netlify Setup" },
      {
        href: "/guides/nextjs-hosting-on-cloudflare-pages/",
        label: "Cloudflare Pages",
      },
    ],
  },
  {
    title: "DNS & Security",
    links: [
      { href: "/guides/dns-records-explained/", label: "DNS Records Guide" },
      { href: "/guides/ssl-certificate-setup-guide/", label: "SSL Setup" },
      { href: "/guides/subdomain-registry-guide/", label: "Subdomain Registry" },
      { href: "/guides/redirect-old-domain-to-new/", label: "Domain Redirects" },
    ],
  },
  {
    title: "Platform Resources",
    links: [
      { href: "/showcase/", label: "Project Showcase" },
      { href: "/trending/", label: "Trending" },
      { href: "/blog/", label: "Blog" },
      { href: "/tools/", label: "Free Tools" },
      { href: "/compare/", label: "Compare Hosting" },
      { href: "/tutorials/", label: "Tutorials" },
    ],
  },
];
