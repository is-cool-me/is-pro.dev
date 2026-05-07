/* is-cool-me — Main JavaScript */
(function () {
  'use strict';

  /* ── Scroll-reveal ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
  });

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

    // Close nav on outside click
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

      // Close all siblings in same accordion group
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

    // Keyboard: Enter / Space already triggers click on buttons
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
        if (previewDefault) previewDefault.style.display = 'none';
        if (previewFull) previewFull.style.display = 'flex';
      } else {
        if (previewDefault) previewDefault.style.display = 'flex';
        if (previewFull) previewFull.style.display = 'none';
      }
    };

    nameInput.addEventListener('input', updatePreview);
    zoneSelect.addEventListener('change', updatePreview);

    // Keep CTA pointing to dashboard
    if (domainCta) {
      domainCta.href = 'https://dash.is-pro.dev';
    }
  }

  /* ── Cookie consent ── */
  const COOKIE_KEY = 'ispro_cookie_consent';
  const cookieBanner = document.getElementById('cookie-banner');

  if (cookieBanner) {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Show after a short delay
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
})();
