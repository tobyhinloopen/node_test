var fs = require("fs"),
    menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html"),
    doctype = html.doctype,
    tag = html.tag,
    starttag = html.starttag;

var cachedDatastr = null;

function jsontest(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  if(cachedDatastr)
    respondWithDataStr(res, cachedDatastr)
  else
    fs.readFile("./data.json", function (err, datastr) {
      if(err) throw err;
      cachedDatastr = datastr;
      respondWithDataStr(res, datastr);
    });
}

function respondWithDataStr(res, datastr) {
  var data = JSON.parse(datastr), str = [], key;

  str.push(doctype(),
      tag("title", "NodeJS JSON + I/O test"),
      style(),
      menu(res));

  for(key in data)
    str.push(tag("code", key + ": " + data[key]),
        starttag("br"));

  str.push(footer(starttime));
  res.end(str.join(""));
}

module.exports = jsontest;
