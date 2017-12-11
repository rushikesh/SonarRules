function initNavigateEvent() {
  $(window).on("navigate", function (event, data) {
    var direction = data.state.direction;
    if (direction == 'back') {
      setTimeout(function () {
        // console.log('id is' + $(curEle).attr('id'));
        $(curEle).scrollTop();
      })
    }
    if (direction == 'forward') {
      // do something else
    }
  });
}