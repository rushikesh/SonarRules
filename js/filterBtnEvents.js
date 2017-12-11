function initFilterBtnEvents() {
  $('#filterResetBtn').on('click', function () {
    $('form')[0].reset();
  });

  $('#filterBtn').on('click', function () {
    filterParams = {};
    var formObj = $('form').serialize().split('&');
    var severityArr = $('input:checked[name="severityCheckbox"]').map(function () {
      return $(this).val();
    });
    filterParams.searchText = $('#srchTerm').val().trim();
    filterParams.severity = (severityArr.get().length == 0) ? [] :
      severityArr.get();
    var data = {
      rules: []
    };
    startIndex = 0;
    endIndex = loadFactor;
    var dataLength = content.rules.length;
    for (var i = 0; i < dataLength; i++) {
      var rule = content.rules[i];
      if ((filterParams.searchText.length != 0 && rule.description.toLowerCase().indexOf(filterParams.searchText.toLowerCase()) !=
          -1) ||
        filterParams
        .severity.indexOf(
          rule
          .defaultSeverity) != -1) {
        data.rules.push(rule);
      }
    }
    filterContent = data;
    updateContent(filterContent);
  });
}