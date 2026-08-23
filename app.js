/* Kagaz site — small progressive-enhancement interactions. No dependencies. */
(function () {
  'use strict';

  /* ---- Theme toggle (persisted, respects OS default) ---- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('kagaz-theme', next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#17140f' : '#f6f2e9');
    });
  }

  /* ---- Mobile nav ---- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Copy buttons on code blocks ---- */
  document.querySelectorAll('.codeblock[data-copy]').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code');
    var SVGNS = 'http://www.w3.org/2000/svg';
    var ico = document.createElementNS(SVGNS, 'svg');
    ico.setAttribute('viewBox', '0 0 24 24'); ico.setAttribute('fill', 'none');
    ico.setAttribute('stroke', 'currentColor'); ico.setAttribute('stroke-width', '2');
    ico.setAttribute('stroke-linecap', 'round'); ico.setAttribute('stroke-linejoin', 'round');
    var rect = document.createElementNS(SVGNS, 'rect');
    rect.setAttribute('x', '9'); rect.setAttribute('y', '9'); rect.setAttribute('width', '11');
    rect.setAttribute('height', '11'); rect.setAttribute('rx', '2');
    var path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('d', 'M5 15V5a2 2 0 0 1 2-2h10');
    ico.appendChild(rect); ico.appendChild(path);
    var lbl = document.createElement('span'); lbl.textContent = 'Copy';
    btn.appendChild(ico); btn.appendChild(lbl);
    block.appendChild(btn);
    btn.addEventListener('click', function () {
      // Copy commands only: clone the block, drop the copy button and every
      // "$ " prompt span, then read text (newlines preserved from source).
      var clone = block.cloneNode(true);
      clone.querySelectorAll('.copy-btn, .prompt').forEach(function (n) { n.remove(); });
      var text = clone.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
      var done = function () {
        var label = btn.querySelector('span');
        var prev = label.textContent;
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = prev; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---- Keyboard access for horizontal scroll regions (axe: scrollable-region-focusable) ---- */
  var makeScrollable = function () {
    document.querySelectorAll('.table-scroll, .codeblock').forEach(function (el) {
      var scrolls = el.scrollWidth > el.clientWidth + 1;
      if (scrolls && el.getAttribute('tabindex') === null) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'group');
        if (!el.getAttribute('aria-label')) {
          el.setAttribute('aria-label', el.classList.contains('codeblock') ? 'Code block, scrollable' : 'Table, scrollable');
        }
      } else if (!scrolls && el.getAttribute('role') === 'group') {
        el.removeAttribute('tabindex'); el.removeAttribute('role');
      }
    });
  };
  if ('requestIdleCallback' in window) { requestIdleCallback(makeScrollable); } else { setTimeout(makeScrollable, 200); }
  var st;
  window.addEventListener('resize', function () { clearTimeout(st); st = setTimeout(makeScrollable, 200); }, { passive: true });
})();
