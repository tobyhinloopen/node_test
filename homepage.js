var menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html"),
    doctype = html.doctype,
    tag = html.tag;

function homepage(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  var str = [];
  str.push(doctype(),
      tag("title", "NodeJS Benchmarking"),
      style(),
      menu(),
      footer(starttime));
  res.end(str.join(""));
}

module.exports = homepage;
