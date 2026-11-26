(function () {
  'use strict';

  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  button.addEventListener('click', function () {
    var isLight = root.getAttribute('data-theme') === 'light';
    var next = isLight ? 'dark' : 'light';

    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });
})();
