// Grafologi Page - Hero Interactions & Navbar

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initParallax();
    initCTARipple();
    initSealRotation();
    initScrollReveal();
    initNavbar();
  }

  /* ─────────────────────────────────────────────
     SUBTLE PARALLAX ON SCROLL
     ───────────────────────────────────────────── */

  function initParallax() {
    const hero = document.querySelector('.hero-certification');
    const seal = document.querySelector('.hero-seal');

    if (!hero || !seal) return;

    let ticking = false;
    let lastScrollY = 0;

    function updateParallax() {
      const scrolled = lastScrollY;
      const rate = scrolled * 0.15;

      if (scrolled < window.innerHeight) {
        seal.style.transform = 'translateY(' + rate + 'px)';
      }

      ticking = false;
    }

    function onScroll() {
      lastScrollY = window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─────────────────────────────────────────────
     CTA BUTTON RIPPLE EFFECT
     ───────────────────────────────────────────── */

  function initCTARipple() {
    var cta = document.querySelector('.hero-cta');
    if (!cta) return;

    cta.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      var rect = cta.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      cta.appendChild(ripple);

      setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  }

  /* ─────────────────────────────────────────────
     SUBTLE SEAL ROTATION ON MOUSE MOVE
     ───────────────────────────────────────────── */

  function initSealRotation() {
    var seal = document.querySelector('.hero-seal');
    if (!seal) return;

    var mouseX = 0;
    var mouseY = 0;
    var currentX = 0;
    var currentY = 0;

    document.addEventListener('mousemove', function (e) {
      var rect = seal.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;

      mouseX = (e.clientX - centerX) / 50;
      mouseY = (e.clientY - centerY) / 50;
    });

    function animate() {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      var rotation = currentX * 0.5;
      var tilt = currentY * 0.3;

      seal.style.transform =
        'rotate(' +
        rotation +
        'deg) perspective(1000px) rotateX(' +
        tilt +
        'deg)';

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ─────────────────────────────────────────────
     SCROLL-TRIGGERED REVEAL FOR CREDENTIALS
     ───────────────────────────────────────────── */

  function initScrollReveal() {
    var credentials = document.querySelector('.hero-credentials');
    if (!credentials) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(credentials);
  }

  /* ─────────────────────────────────────────────
     NAVBAR MOBILE TOGGLE
     ───────────────────────────────────────────── */

  function initNavbar() {
    var toggle = document.getElementById('mobileToggle');
    var dropdown = document.getElementById('mobileDropdown');
    var menuIcon = document.getElementById('menuIcon');
    var closeIcon = document.getElementById('closeIcon');

    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', function () {
      var isOpen = !dropdown.classList.contains('hidden');
      dropdown.classList.toggle('hidden');

      if (menuIcon && closeIcon) {
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      }
    });

    // Close mobile dropdown when clicking a link
    var mobileLinks = dropdown.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        dropdown.classList.add('hidden');
        if (menuIcon && closeIcon) {
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      });
    });
  }
})();
