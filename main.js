// ==============================
// KARTHIKEYAN N — PORTFOLIO JS
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  // --- NAV SCROLL ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- HAMBURGER MOBILE MENU ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // --- INTERSECTION OBSERVER REVEALS ---
  const revealEls = document.querySelectorAll('.reveal');
  const sectionEls = document.querySelectorAll('.skill-card, .project-card, .service-card, .timeline-item, .contact-card');

  // Add reveal class to section elements
  sectionEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger delay
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
  });

  const allReveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  allReveals.forEach(el => observer.observe(el));

  // --- SMOOTH ANCHOR SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- ACTIVE NAV HIGHLIGHT ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));

  // --- CURSOR GLOW EFFECT (desktop only) ---
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(232,160,32,0.04) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // --- COUNTER ANIMATION ---
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      const data = [
        { el: statNums[0], val: 4, suffix: '+' },
        { el: statNums[1], val: 10, suffix: '+' },
      ];
      data.forEach(({ el, val, suffix }) => {
        if (el) animateCounter(el, val, suffix);
      });
    }
  }, { threshold: 0.5 });

  if (statNums[0]) statsObserver.observe(statNums[0].closest('.hero-stats'));

});
