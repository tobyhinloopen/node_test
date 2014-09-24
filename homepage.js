var menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html"),
    doctype = html.doctype,
    tag = html.tag;

function homepage(res) {
  var starttime = process.hrtime(),
      buffstr = "",
      buffres = { write: function(str) { buffstr += str; } };
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  doctype(buffres);
  tag(buffres, "title", "NodeJS Benchmarking");
  style(buffres);
  menu(buffres);
  footer(buffres, starttime);
  res.end(buffstr);
}

module.exports = homepage;
