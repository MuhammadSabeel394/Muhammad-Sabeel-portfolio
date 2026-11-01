/**
 * MY_JANNE Global Application Logic
 * Navbar, active routes, mobile drawer, scroll animations
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      const isExpanded = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // 2. Active Page Highlighting based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Navbar Glass Effect on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.background = 'rgba(7, 9, 14, 0.95)';
        header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6)';
      } else {
        header.style.background = 'rgba(13, 18, 29, 0.75)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // 4. Scroll Reveal Observer for Cards
  const animatedElements = document.querySelectorAll('.glass-card, .skill-card, .cert-card, .project-card, .timeline-item');
  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

  // 5. Dynamic Footer Year
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
