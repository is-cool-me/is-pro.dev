/* is-cool-me — Main JavaScript */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ── Scroll-reveal ── */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01 }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ── Sticky header ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const headerNav = document.querySelector('.header-nav');
  const headerActions = document.querySelector('.header-actions');

  if (navToggle && headerNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      if (headerActions) headerActions.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && headerNav.classList.contains('open')) {
        headerNav.classList.remove('open');
        if (headerActions) headerActions.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Accordion ── */
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('open');

      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item.open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const b = openItem.querySelector('.accordion-body');
            if (b) b.style.height = '0';
            const t = openItem.querySelector('.accordion-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        body.style.height = '0';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        body.style.height = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Domain preview ── */
  const nameInput = document.getElementById('domain-name');
  const zoneSelect = document.getElementById('domain-zone');
  const previewName = document.getElementById('preview-name');
  const previewZone = document.getElementById('preview-zone');
  const previewDefault = document.getElementById('preview-default');
  const previewFull = document.getElementById('preview-full');
  const domainCta = document.getElementById('domain-cta');

  if (nameInput && zoneSelect && previewName) {
    const updatePreview = () => {
      const name = nameInput.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      const zone = zoneSelect.value;

      if (name) {
        previewName.textContent = name;
        previewZone.textContent = zone;
      if (previewDefault) previewDefault.classList.add('is-hidden');
      if (previewFull) previewFull.classList.remove('is-hidden');
      if (previewFull) previewFull.classList.add('is-flex');
    } else {
      if (previewDefault) previewDefault.classList.remove('is-hidden');
      if (previewFull) previewFull.classList.add('is-hidden');
      if (previewFull) previewFull.classList.remove('is-flex');
    }
    };

    nameInput.addEventListener('input', updatePreview);
    zoneSelect.addEventListener('change', updatePreview);
    if (domainCta) {
      domainCta.href = 'https://dash.is-pro.dev';
    }
  }

  /* ── Ad display toggles ── */
  const adVisibility = () => {
    const isDesktop = window.innerWidth > 640;
    const desktopAds = document.querySelectorAll('[data-ad="desktop"], [data-ad="desktop-flex"]');
    const mobileAds = document.querySelectorAll('[data-ad="mobile"]');

    desktopAds.forEach((el) => {
      const isFlex = el.getAttribute('data-ad') === 'desktop-flex';
      el.classList.toggle('visible', isDesktop);
      if (isFlex) {
        el.classList.toggle('ad-shell-flex', true);
      }
      el.setAttribute('aria-hidden', isDesktop ? 'false' : 'true');
    });

    mobileAds.forEach((el) => {
      el.classList.toggle('visible', !isDesktop);
      el.setAttribute('aria-hidden', isDesktop ? 'true' : 'false');
    });
  };

  adVisibility();
  window.addEventListener('resize', adVisibility, { passive: true });

  /* ── Cookie consent ── */
  const COOKIE_KEY = 'ispro_cookie_consent';
  const cookieBanner = document.getElementById('cookie-banner');

  if (cookieBanner) {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1200);
    }

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      hideCookieBanner();
    });

    document.getElementById('cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'declined');
      hideCookieBanner();
    });

    function hideCookieBanner() {
      cookieBanner.classList.remove('visible');
      setTimeout(() => cookieBanner.remove(), 600);
    }
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href === currentPath || (href !== '' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });

  /* ── Reading Progress Bar ── */
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = progress + '%';
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── TOC Generation ── */
  const tocContainer = document.getElementById('toc-container');
  const tocList = document.getElementById('toc-list');
  const articleContent = document.querySelector('.doc-content') || document.querySelector('.article-content');
  const tocTarget = tocList || tocContainer;

  if (tocTarget && articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3');
    const tocItems = [];
    const headingElements = [];

    headings.forEach((heading, index) => {
      const tag = heading.tagName.toLowerCase();
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }

      let link;
      if (tocContainer) {
        link = document.createElement('a');
        link.href = '#' + heading.id;
        link.className = 'toc-link' + (tag === 'h3' ? ' toc-h3' : '');
        link.textContent = heading.textContent;
        tocContainer.appendChild(link);
      } else {
        link = document.createElement('a');
        link.href = '#' + heading.id;
        link.className = 'toc-link toc-' + tag;
        link.textContent = heading.textContent;
        tocList.appendChild(link);
      }
      tocItems.push(link);
      headingElements.push(heading);
    });

    if (tocItems.length === 0) {
      const sidebar = document.getElementById('toc-sidebar');
      if (sidebar) sidebar.style.display = 'none';
      const tocWrap = document.querySelector('.toc-sidebar');
      if (tocWrap) tocWrap.style.display = 'none';
    }

    let activeIndex = -1;
    const updateToc = () => {
      const scrollPos = window.scrollY + 120;
      let newActive = -1;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const rect = headingElements[i].getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        if (scrollPos >= offsetTop) {
          newActive = i;
          break;
        }
      }

      if (newActive !== activeIndex) {
        tocItems.forEach((item) => item.classList.remove('active'));
        if (newActive >= 0) {
          tocItems[newActive].classList.add('active');
        }
        activeIndex = newActive;
      }
    };

    window.addEventListener('scroll', updateToc, { passive: true });
    updateToc();
  }

  /* ── Anchor Links on Headings ── */
  const contentArea = document.querySelector('.doc-content') || document.querySelector('.article-content');
  if (contentArea) {
    const headings = contentArea.querySelectorAll('h2, h3');
    headings.forEach((heading) => {
      if (!heading.id) return;
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.className = 'anchor-link';
      link.setAttribute('aria-label', 'Link to this section');
      link.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
      heading.appendChild(link);
    });
  }

  /* ── Copy Buttons on Code Blocks ── */
  document.querySelectorAll('.prose pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;

    let scroller = pre.querySelector(':scope > .code-scroll');
    if (!scroller) {
      scroller = document.createElement('div');
      scroller.className = 'code-scroll';

      const nodesToWrap = Array.from(pre.childNodes).filter((node) => {
        return !(node instanceof Element && node.classList.contains('copy-button'));
      });

      nodesToWrap.forEach((node) => scroller.appendChild(node));
      pre.insertBefore(scroller, pre.firstChild);
    }

    if (!scroller.contains(code)) {
      scroller.appendChild(code);
    }

    let btn = pre.querySelector(':scope > .copy-button');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'copy-button';
      btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
      pre.appendChild(btn);
    }

    btn.addEventListener('click', async () => {
      const text = code.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => {
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
        }, 2000);
      }
    });
  });

})();
