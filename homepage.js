var menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html"),
    doctype = html.doctype,
    tag = html.tag;

function homepage(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  doctype(res);
  tag(res, "title", "NodeJS Benchmarking");
  style(res);
  menu(res);
  footer(res, starttime);
  res.end();
}

module.exports = homepage;
