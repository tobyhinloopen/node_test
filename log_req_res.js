module.exports = function(req, res) {
  console.log(currentDateString() + ": " + req.method + " " + req.url);
  var starttime = process.hrtime(), oldEnd = res.end;
  res.end = function() {
    var duration = process.hrtime(starttime);
    oldEnd.apply(this, arguments);
    var sourceMatch = new Error().stack.match(
            /at .+[\r\n]+\s+at (?:[^(\r\n]+\((.+\.js:\d+)|(.+\.js:\d+))/),
        source = (sourceMatch[1] || sourceMatch[2]).replace(__dirname+"/", ""),
        contentTypeMatch = this._header.match(/Content-Type: (.+)/),
        contentType = contentTypeMatch ? contentTypeMatch[1] : "unknown",
        sizeStr, contentLengthMatch, infoStr,
        ms = (duration[0] * 1e3 + duration[1] / 1e6).toFixed(2);

    if(this.chunkedEncoding)
      sizeStr = "chunked"
    else if(contentLengthMatch = this._header.match(/Content-Length: (\d+)/))
      sizeStr = (contentLengthMatch[1]/1000).toFixed(1) + "kB";
    else
      sizeStr = "unknown";

    infoStr = sizeStr == "unknown" && contentType == "unknown"
        ? "no body" : sizeStr +", "+ contentType;

    console.log("                   ↳ " + this.statusCode + " " + STATUS[this.statusCode]
        + " by " + source + " (" + infoStr +") in " + ms + "ms");
  }
};

var STATUS = {
  200: "OK",
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",
  404: "Not Found",
  500: "Internal Server Error"
};

function currentDateString() {
  var date = new Date();
  return date.getFullYear() + "-" + pad(date.getMonth()+1) + "-" + pad(date.getDate())
      + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}
