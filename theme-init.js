/* Applies the saved theme before first paint to avoid a flash.
   External (not inline) so the page can ship a strict CSP without 'unsafe-inline'. */
(function () {
  try {
    var t = localStorage.getItem('kagaz-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
