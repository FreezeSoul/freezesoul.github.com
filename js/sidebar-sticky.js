/**
 * Sidebar Sticky Behavior
 *
 * Handles intelligent sidebar positioning during scroll:
 * - Short sidebar (fits viewport): CSS sticky top: 25px (no JS needed)
 * - Tall sidebar (exceeds viewport): proportionally shifts content via transform
 *   across the full page scroll range, so bottom aligns with viewport bottom
 *   at the end of the page.
 *
 * Only activates on tablet+ screens (>= 768px).
 *
 * IMPORTANT: .cyber-wrapper must use overflow-x: clip (not hidden),
 * otherwise position: sticky is broken by the scroll container.
 */
(function () {
  'use strict';

  var sidebar = document.querySelector('.cyber-sidebar');
  if (!sidebar) return;

  var PADDING = 25;
  var ticking = false;

  function update() {
    // Only apply on tablet+ screens
    if (window.innerWidth < 768) {
      sidebar.style.transform = '';
      return;
    }

    var viewportH = window.innerHeight;
    var sidebarH = sidebar.offsetHeight;

    // Short sidebar: CSS sticky handles it, no transform needed
    if (sidebarH + PADDING * 2 <= viewportH) {
      sidebar.style.transform = '';
      return;
    }

    // Tall sidebar: shift content proportionally across full page scroll
    var layout = sidebar.closest('.cyber-layout');
    if (!layout) return;

    var layoutRect = layout.getBoundingClientRect();
    var layoutTop = layoutRect.top + window.scrollY;
    var layoutH = layout.offsetHeight;

    // Max amount to shift: enough to bring sidebar bottom to viewport bottom
    var maxShift = sidebarH - viewportH + PADDING;

    // Map the ENTIRE page scroll range to [0, maxShift]
    // scrollStart: when sidebar first sticks (top reaches viewport top + padding)
    // scrollEnd: when page bottom reaches viewport bottom
    var scrollStart = Math.max(0, layoutTop - PADDING);
    var scrollEnd = layoutTop + layoutH - viewportH;
    var scrollRange = Math.max(1, scrollEnd - scrollStart);

    // Calculate progress [0, 1] across the full page
    var progress = (window.scrollY - scrollStart) / scrollRange;
    progress = Math.max(0, Math.min(progress, 1));

    // Apply proportional shift
    var shift = progress * maxShift;

    sidebar.style.transform = 'translateY(' + (-shift) + 'px)';
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial calculation
  update();

  // Re-calculate after fonts load (sidebar height may change)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(update);
  }

  // Fallback: re-calculate after short delay for late-loading content
  setTimeout(update, 100);
})();
