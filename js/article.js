(function () {
  'use strict';

  var content = document.getElementById('article-content');
  var layout = document.getElementById('post-layout');
  var toc = document.getElementById('post-toc');
  var progress = document.getElementById('reading-progress-bar');
  if (!content || !layout || !toc) return;

  var headings = Array.prototype.slice.call(content.querySelectorAll('h2, h3')).filter(function (heading) {
    return heading.textContent.trim().length > 0;
  });

  if (headings.length < 2) {
    layout.classList.add('no-toc');
  } else {
    headings.forEach(function (heading, index) {
      if (!heading.id) heading.id = 'section-' + (index + 1);

      var link = document.createElement('a');
      link.className = 'toc-link toc-' + heading.tagName.toLowerCase();
      link.href = '#' + heading.id;
      link.textContent = heading.textContent.trim();
      link.dataset.target = heading.id;
      toc.appendChild(link);
    });
  }

  var links = Array.prototype.slice.call(toc.querySelectorAll('.toc-link'));
  var ticking = false;

  function update() {
    var documentElement = document.documentElement;
    var scrollable = documentElement.scrollHeight - documentElement.clientHeight;
    var ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;

    if (progress) {
      progress.style.transform = 'scaleX(' + ratio + ')';
    }

    if (headings.length > 1) {
      var current = headings[0];
      headings.forEach(function (heading) {
        if (heading.getBoundingClientRect().top <= 150) current = heading;
      });

      links.forEach(function (link) {
        var active = link.dataset.target === current.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
