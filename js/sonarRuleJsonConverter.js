const testFolder = './bkp/';
const fs = require('fs');
var langKV = [{
  "key": "abap",
  "name": "ABAP"
}, {
  "key": "c",
  "name": "C"
}, {
  "key": "cpp",
  "name": "C++"
}, {
  "key": "cobol",
  "name": "COBOL"
}, {
  "key": "csharp",
  "name": "C#"
}, {
  "key": "flex",
  "name": "Flex"
}, {
  "key": "java",
  "name": "Java"
}, {
  "key": "jsp",
  "name": "JSP"
}, {
  "key": "javascript",
  "name": "Javascript"
}, {
  "key": "objective-c",
  "name": "Objective C"
}, {
  "key": "php",
  "name": "PHP"
}, {
  "key": "pli",
  "name": "PL/I"
}, {
  "key": "plsql",
  "name": "PL/SQL"
}, {
  "key": "python",
  "name": "Python"
}, {
  "key": "rpg",
  "name": "RPG"
}, {
  "key": "swift",
  "name": "Swift"
}, {
  "key": "typescript",
  "name": "TypeScript"
}, {
  "key": "tsql",
  "name": "T-SQL"
}, {
  "key": "vbnet",
  "name": "VB.NET"
}, {
  "key": "web",
  "name": "Web"
}, {
  "key": "xml",
  "name": "XML"
}, {
  "key": "vb6",
  "name": "VB 6"
}, {
  "key": "vbnet",
  "name": "VB.Net"
}];

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
  var obj = JSON.parse(fs.readFileSync(testFolder + file, 'utf8'));
  var resObj = {
    "types": {
      "Vulnerability": 0,
      "Code Smell": 0,
      "Bug": 0,
      "Other": 0
    },
    rules: []
  }

  function makeFirstCharCapital(str) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase();
    } else {
      return '';
    }
  }

  function Rule(summary, type, severity, description, debt) {
    this.summary = summary;
    this.type = type;
    this.defaultSeverity = severity;
    this.description = description;
    this.debt = debt;
  }
  obj.rules.forEach(function (rule) {
    var type = '';
    switch (rule.type.toUpperCase()) {
      case "BUG":
        type = "Bug";
        resObj.types[type] += 1;
        break;
      case "CODE_SMELL":
        type = "Code Smell";
        resObj.types[type] += 1;
        break;
      case "VULNERABILITY":
        type = "Vulnerability";
        resObj.types[type] += 1;
        break;
      default:
        type = "Bug";
        resObj.types.Other += 1;
    }
    resObj.rules.push(new Rule(rule.name, type, makeFirstCharCapital(rule.severity), rule.htmlDesc, rule.debtRemFnOffset));
    for (var i = 0; i < langKV.length; i++) {
      if ((langKV[i].key) + '.json' == file) {
        langKV[i].types = resObj.types;
      }
    }
  });

  fs.writeFileSync('./' + file, JSON.stringify(resObj), function (err) {
    if (err)
      return console.log(err);
    console.log('wrote to' + file);
  });

  fs.writeFileSync('languages.json', JSON.stringify(langKV), function (err) {
    if (err)
      return console.log(err);
    console.log('wrote to' + file);
  });

})