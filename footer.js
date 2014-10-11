var html = require("./html");

function footer(starttime) {
  var duration = process.hrtime(starttime),
      message = "rendered in " + (duration[0] * 1e3 + duration[1] / 1e6).toFixed(2) + "ms";
  return html.starttag("p") + html.text(message);
}

module.exports = footer;
