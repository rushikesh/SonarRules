function initClickEvents() {
  $('#qlist').on('click', 'a', function () {
    titleTxt = $(this).text().replace(/\d+/, '');
    $("#headerTitle").html(titleTxt);
    var fileName = $(this).attr('id');
    $.getJSON('../json/' + fileName + '.json', function (data) {
      content = data;
      filterContent = data;
      setCntValuesInHeader(data);
      $.each('#hsrc,#hbug,#hsml,#hvul'.split(','), function (i, ele) {
        $($(ele).find('use')[0]).attr('class', 'svglogoDisable');
      });
      $($('#hsrc').find('use')[0]).attr('class', 'svglogo');
      startIndex = 0;
      endIndex = loadFactor;
      updateContent(data);
    });
    $("#nav-panel").panel("close");
  });

  $('#criteria').on('click', '#hsrc,#hbug,#hsml,#hvul', function () {
    $.each('#hsrc,#hbug,#hsml,#hvul'.split(','), function (i, ele) {
      $($(ele).find('use')[0]).attr('class', 'svglogoDisable');
    });

    var data = {
      rules: []
    };
    var id = $(this)[0].id;
    $($('#' + id).find('use')[0]).attr('class', 'svglogo');
    var val;
    switch (id) {
      case "hbug":
        val = "Bug";
        break;
      case "hvul":
        val = "Vulnerability";
        break;
      case "hsml":
        val = "Code Smell";
        break;
      default:
        val = "All";
    }
    var rules = content.rules;
    if (val !== "All") {
      $.each(rules, function (i, rule) {
        if (rule.type === val) {
          data.rules.push(rule);
        }
      });
    } else {
      data.rules = rules;
    }
    startIndex = 0;
    endIndex = loadFactor;
    filterContent = data;
    updateContent(filterContent);
  });


  $('#content').on('click', '#langRule a', function () {
    $("#headerTitle2").html(titleTxt);
    id = $(this).attr('id');
    curEle = $(this);
    displayEntireRuleData(id);
    $.mobile.navigate("#imgPage", {
      transition: "slide"
    });
  });

}