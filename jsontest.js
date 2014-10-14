var fs = require("fs"),
    menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html");

var cachedDatastr = null;

function jsontest(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  if(cachedDatastr)
    respondWithDataStr(res, cachedDatastr, starttime)
  else
    fs.readFile("./data.json", function (err, datastr) {
      if(err) throw err;
      cachedDatastr = datastr;
      respondWithDataStr(res, datastr, starttime);
    });
}

function respondWithDataStr(res, datastr, starttime) {
  var data = JSON.parse(datastr), str = "", key;

  str += html.doctype() + html.title("NodeJS JSON + I/O test") + style() + menu("/jsontest") + "<pre>";

  for(key in data)
    str += html.text(key + ": " + data[key] + "\n");

  res.end(str + "</pre>" + footer(starttime));
}

module.exports = jsontest;
