function initSwipeEvents() {
  $('#imgPage').on('swipeleft', function (event) {
    if (event.target.localName == 'pre') {
      return;
    }
    if (id < filterContent.rules.length - 1) {
      id++;
      curEle = $("#" + id);
      $(window).scrollTop(0);
      displayEntireRuleData(id);
    }
    return;
  });

  $('#imgPage').on('swiperight', function (event) {
    if (event.target.localName == 'pre') {
      return;
    }
    id--;
    if (id < 0) {
      id = 0;
      return;
    }
    curEle = $("#" + id);
    $(window).scrollTop(0);
    displayEntireRuleData(id);
  });
}