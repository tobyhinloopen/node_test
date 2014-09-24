var fs = require("fs");

function asset(res, file, type) {
  fs.readFile(file, function(err, data) {
    if(err) throw err;
    res.writeHead(200, {"Content-Type": type});
    res.end(data);
  });
}

module.exports = asset;
