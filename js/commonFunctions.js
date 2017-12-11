function getTotalRuleCount(data) {
  var sum = 0;
  for (var key in data.types) {
    if (data.types.hasOwnProperty(key))
      sum += data.types[key]
  }
  return sum;
}

function setCntValuesInHeader(data) {
  var types = data.types;
  var sum = 0,
    sml = 0,
    bug = 0,
    vul = 0;
  for (var type in types) {
    if (types.hasOwnProperty(type)) {
      sum += types[type];
      switch (type) {
        case "Code Smell":
          sml += types[type];
          break;
        case "Vulnerability":
          vul += types[type];
          break;
        case "Bug":
          bug += types[type];
          break;
        default:
          break;
      }
    }
  }
  $('#cntSml').text(sml);
  $('#cntBug').text(bug);
  $('#cntVul').text(vul);
  $('#cntSrc').text(sum);
}


function displayEntireRuleData(id) {
  var rule = filterContent.rules[id];
  var severityName = rule.defaultSeverity;
  var severity = getSeverity(rule.defaultSeverity);;
  var type = getType(rule.type);
  $("#content2").text(rule.summary);
  $("#content2").append('<br/><div>');
  $("#content2").append(
    '<svg viewBox="0 0 16 16" style="width:17px;height:17px;position:relative;top:4px;"><use xlink:href="' + type.svg +
    '#' +
    type.type +
    '"  class="svglogo"></use></svg>');
  $("#content2").append('&nbsp;&nbsp;');
  $("#content2").append(rule.type);
  $("#content2").append(
    '<span style="float:right"><svg viewBox="0 0 16 16" style="width:17px;height:17px;position:relative;top:5px;"><use xlink:href="' +
    severity.svg + '#' +
    severity.severity +
    '"></use></svg>' + severityName + '</span>');
  $("#content2").append('</div>');
  if (rule.debt) {
    $("#content2").append('<br/><br/><div style="">Technical Debt: ' + rule.debt + '</div>');
  }
  $("#content2").append('<br/><div>' + rule.description + '</div>');
}

function updateContent(content) {
  var data = content.rules;
  var ul;
  if ($('#langRule').length == 0) {
    ul = document.createElement('ol');
    ul.id = "langRule";
    ul["data-role"] = "listview";
    $("#content").html(ul);
  }
  if (startIndex == 0) {
    $('#langRule').html('');
    setTimeout(function () {
      $(window).scrollTop(0);
    });
  }
  $.each(data, function (i) {
    if (i >= startIndex && i <= endIndex) {
      var li = document.createElement('li');
      if (i == endIndex) {
        li.id = 'loadMore';
      }
      var ele = document.createElement('a');
      var spn = document.createElement('span');
      ele.href = "#";
      ele.id = i;
      spn.innerText = data[i].summary;
      spn.className = "rule"
      var severityName = data[i].defaultSeverity;
      var severity = data[i].defaultSeverity;
      var type = data[i].type;
      var typeName = data[i].type;
      type = getType(type);
      severity = getSeverity(severity);
      $(ele).append(
        '<span class="ruleMeta"><svg viewBox="0 0 16 16" style="position:relative;width:25px;height:25px;top:6px"><use xlink:href="' +
        type.svg + '#' +
        type.type + '" class="svglogoBlack"></use></svg>' + typeName +
        '<span style="position:relative;float:right;top:9px"><svg viewBox="0 0 16 16" style="position:relative;width:20px;height:20px;top:5px"><use xlink:href="' +
        severity.svg + '#' +
        severity.severity + '" class="svglogoBlack"></use></svg><span style="position:relative;top:-2px">' +
        severityName +
        '</span></span><span>'
      );
      $(ele).append(spn);
      $(li).append(ele);
      $('#langRule').append(li);
    }
  });
  $('#langRule').listview().listview('refresh');
}

function getType(type) {
  var retrnVal = {
    svg: '',
    type: ''
  };
  switch (type) {
    case "Bug":
      retrnVal.type = "bug";
      retrnVal.svg = "../img/bug.svg"
      break;
    case "Code Smell":
      retrnVal.type = "sml";
      retrnVal.svg = "../img/codesmell.svg"
      break;
    case "Vulnerability":
      retrnVal.type = "vul";
      retrnVal.svg = "../img/vulnerability.svg"
      break;
    default:
      retrnVal.type = "bug";
      retrnVal.svg = "../img/bug.svg"
  }
  return retrnVal;
}

function getSeverity(severityName) {
  var retrnVal = {
    svg: '',
    severity: ''
  };
  switch (severityName.toLowerCase()) {
    case "major":
      retrnVal.severity = "maj";
      retrnVal.svg = "../img/major.svg"
      break;
    case "minor":
      retrnVal.severity = "min";
      retrnVal.svg = "../img/minor.svg"
      break;
    case "critical":
      retrnVal.severity = "cri";
      retrnVal.svg = "../img/critical.svg"
      break;
    case "blocker":
      retrnVal.severity = "blk";
      retrnVal.svg = "../img/blocker.svg"
      break;
    case "info":
      retrnVal.severity = "inf";
      retrnVal.svg = "../img/info.svg"
      break;
    default:
      retrnVal.severity = "maj";
      retrnVal.svg = "../img/major.svg"
  }
  return retrnVal;
}