var fs = require("fs"),
    menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html"),
    doctype = html.doctype,
    tag = html.tag,
    starttag = html.starttag;

function jsontest(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  fs.readFile("./data.json", function (err, datastr) {
    if(err) throw err;
    var data = JSON.parse(datastr), str = "", key;
    for(key in data)
      str += tag("code", key + ": " + data[key]) + starttag("br");
    res.end(doctype()
      + tag("title", "NodeJS JSON + I/O test")
      + style()
      + menu(res)
      + str
      + footer(starttime));
  });
}

module.exports = jsontest;
