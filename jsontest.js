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
    var data = JSON.parse(datastr);
    doctype(res);
    tag(res, "title", "NodeJS JSON + I/O test");
    style(res);
    menu(res);
    starttag(res, "br");
    for(var x in data) {
      tag(res, "code", x + ": " + data[x]);
      starttag(res, "br");
    }
    footer(res, starttime);
    res.end();
  });
}

module.exports = jsontest;
