document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.getElementById('navbar');
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-links');
  var navLinks = navList.querySelectorAll('a');

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  function setMenu(open) {
    navList.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!navList.classList.contains('open'));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // Navbar shadow once the page is scrolled
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section currently in view
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  // Gallery lightbox
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('img');
  var lightboxCaption = lightbox.querySelector('figcaption');
  var current = 0;
  var lastFocused = null;

  function show(index) {
    current = (index + items.length) % items.length;
    var img = items[current].querySelector('img');
    var caption = items[current].querySelector('.gallery-overlay p');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('open')) setMenu(false);
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});
