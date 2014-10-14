var fs = require("fs"),
    assert = require("assert"),
    Q = require("q");

function asset(res, req, file, type) {
  var ifModifiedSince = req.headers["if-modified-since"];
  ifModifiedSince = ifModifiedSince && new Date(ifModifiedSince);
  var mtime;

  Q.nfcall(fs.stat, file).then(function(stats) {
    if((mtime = stats.mtime) > ifModifiedSince || !ifModifiedSince)
      return Q.nfcall(fs.readFile, file);
    res.writeHead(304, {});
    res.end();
  }).then(function(data) {
    if(!data)
      return;
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": data.length,
      "Last-Modified": mtime.toUTCString()
    });
    res.end(data);
  }).catch(function(err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(err);
  })
}

module.exports = asset;
