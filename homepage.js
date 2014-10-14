var menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html");

function homepage(res) {
  var starttime = process.hrtime(),
      str = html.doctype() + html.title("NodeJS Benchmarking") + style() + menu("/") + footer(starttime),
      length = Buffer.byteLength(str, "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Content-Length": length });
  res.end(str);
}

module.exports = homepage;
