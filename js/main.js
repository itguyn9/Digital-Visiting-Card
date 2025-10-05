// main.js - responsive nav + theme + smooth scroll + ripple
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('navbar') || document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions') || document.querySelector('#navbar');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const headerOffset = (nav && nav.offsetHeight) ? nav.offsetHeight : 70;

  /* --------- Create mobile menu toggle (if not present) --------- */
  let mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (!mobileToggle) {
    mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.setAttribute('aria-label', 'Toggle menu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';
    // insert before nav-links if possible
    if (navActions) {
      // place at end of navActions (works with different nav structures)
      navActions.insertBefore(mobileToggle, navActions.firstChild);
    } else if (nav) {
      nav.appendChild(mobileToggle);
    }
  }

  mobileToggle.addEventListener('click', (e) => {
    mobileToggle.classList.toggle('active');
    const expanded = mobileToggle.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (navLinks) navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!nav || !navLinks) return;
    if (!nav.contains(target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu on resize if desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navLinks && navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* --------- Smooth scroll for internal links --------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset - 8);
      window.scrollTo({ top, behavior: 'smooth' });

      // close mobile menu after click
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* --------- Sticky header shadow on scroll --------- */
  window.addEventListener('scroll', () => {
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  /* --------- Theme toggle (light/dark) --------- */
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
      // optional: change icon
      themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // apply saved theme
    const saved = localStorage.getItem('site-theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  /* --------- Button ripple effect (for .ripple elements) --------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

});
