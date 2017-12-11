function populateLanguageData() {
  $.getJSON('../json/languages.json', function (data) {
    $.each(data, function (i) {
      var li = document.createElement('li');
      var ele = document.createElement('a');
      ele.href = "#";
      ele.id = data[i].key;
      var cnt = getTotalRuleCount(data[i]);
      ele.innerHTML = data[i].name + "<span class='ui-li-count'>" + cnt + "</span>";
      $(li).append(ele);
      $("#qlist").append(li);
    });
    $('#qlist').listview().listview('refresh');
    $("#nav-panel").panel("open");
  });
}