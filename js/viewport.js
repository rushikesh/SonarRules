function initializeViewportCheckCode() {
  $.fn.isInViewport = function () {
    if ($(this).length) {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
    return false;
  };
}