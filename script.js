(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Theme toggle
  --------------------------------------------------------- */
  var themeToggle = document.getElementById('theme-toggle');
  var htmlEl = document.documentElement;

  function setThemeButtonState() {
    var isDark = htmlEl.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  setThemeButtonState();

  themeToggle.addEventListener('click', function () {
    var current = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('mw-theme', next);
    setThemeButtonState();
  });

  /* ---------------------------------------------------------
     Sticky header scroll state
  --------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function updateHeaderState() {
    if (window.scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------------------------------------------------------
     Mobile drawer
  --------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileDrawer = document.getElementById('mobile-drawer');

  function closeDrawer() {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  function openDrawer() {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  navToggle.addEventListener('click', function () {
    if (mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  mobileDrawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ---------------------------------------------------------
     "Book a Consultation" / "View Details" -> scroll + focus form
  --------------------------------------------------------- */
  document.querySelectorAll('[data-focus-form="true"]').forEach(function (el) {
    el.addEventListener('click', function () {
      window.setTimeout(function () {
        var nameField = document.getElementById('cf-name');
        if (nameField) nameField.focus({ preventScroll: true });
      }, 400);
    });
  });

  /* ---------------------------------------------------------
     Properties filter bar
  --------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var propertyCards = document.querySelectorAll('.property-card');
  var filterEmpty = document.getElementById('filter-empty');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;

      propertyCards.forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(' ');
        var matches = filter === 'all' || categories.indexOf(filter) !== -1;
        card.classList.toggle('hidden', !matches);
        if (matches) visibleCount++;
      });

      if (filterEmpty) filterEmpty.hidden = visibleCount !== 0;
    });
  });

  /* ---------------------------------------------------------
     About stats count-up on scroll
  --------------------------------------------------------- */
  var statNumbers = document.querySelectorAll('.stat-number');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  if (statNumbers.length) {
    var statsObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) { statsObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     Testimonial carousel
  --------------------------------------------------------- */
  var carousel = document.getElementById('testimonial-carousel');

  if (carousel) {
    var track = document.getElementById('carousel-track');
    var slides = track.children;
    var dotsWrap = document.getElementById('carousel-dots');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var current = 0;
    var autoplayTimer = null;
    var autoplayDelay = 6000;

    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      (function (index) {
        dot.addEventListener('click', function () { goTo(index); restartAutoplay(); });
      })(i);
      dotsWrap.appendChild(dot);
    }

    var dots = dotsWrap.children;

    function render() {
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('is-active', d === current);
      }
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      render();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      if (prefersReducedMotion) return;
      stopAutoplay();
      autoplayTimer = window.setInterval(next, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    nextBtn.addEventListener('click', function () { next(); restartAutoplay(); });
    prevBtn.addEventListener('click', function () { prev(); restartAutoplay(); });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    var touchStartX = 0;
    var touchDeltaX = 0;

    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
      stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchmove', function (e) {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    carousel.addEventListener('touchend', function () {
      if (touchDeltaX > 40) {
        prev();
      } else if (touchDeltaX < -40) {
        next();
      }
      startAutoplay();
    });

    render();
    startAutoplay();
  }

  /* ---------------------------------------------------------
     Contact form -> validate, then open WhatsApp with message
  --------------------------------------------------------- */
  var form = document.getElementById('contact-form');

  if (form) {
    var fields = ['name', 'email', 'phone', 'interest', 'message'];

    function showError(field, message) {
      var group = document.getElementById('cf-' + field).closest('.form-group');
      var errorEl = document.getElementById('cf-' + field + '-error');
      if (message) {
        group.classList.add('has-error');
        errorEl.textContent = message;
      } else {
        group.classList.remove('has-error');
        errorEl.textContent = '';
      }
    }

    function validate() {
      var valid = true;
      var values = {};

      fields.forEach(function (field) {
        var el = document.getElementById('cf-' + field);
        values[field] = el.value.trim();

        if (!values[field]) {
          showError(field, 'This field is required.');
          valid = false;
        } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field])) {
          showError(field, 'Enter a valid email address.');
          valid = false;
        } else if (field === 'phone' && !/^[0-9+()\-\s]{7,}$/.test(values[field])) {
          showError(field, 'Enter a valid phone number.');
          valid = false;
        } else {
          showError(field, '');
        }
      });

      return valid ? values : null;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var values = validate();
      if (!values) return;

      var message = 'Hello Micakins Wisdom, I would like to get in touch.%0A%0A' +
        'Name: ' + encodeURIComponent(values.name) + '%0A' +
        'Email: ' + encodeURIComponent(values.email) + '%0A' +
        'Phone: ' + encodeURIComponent(values.phone) + '%0A' +
        'Interested in: ' + encodeURIComponent(values.interest) + '%0A' +
        'Message: ' + encodeURIComponent(values.message);

      window.open('https://wa.me/2348060747176?text=' + message, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  }
})();
