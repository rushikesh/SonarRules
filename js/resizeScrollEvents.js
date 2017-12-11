function initResizeScrollEvents() {
  $(document).on('resize scroll', function () {
    if ($('#loadMore').isInViewport()) {
      startIndex = endIndex + 1;
      endIndex = endIndex + loadFactor;
      $('#loadMore').removeAttr('id');
      updateContent(filterContent);
    }
  });
}