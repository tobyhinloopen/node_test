var tag = require("./html").tag;

function footer(starttime) {
  var duration = process.hrtime(starttime);
  return tag("p", "rendered in " + (duration[0] * 1e3 + duration[1] / 1e6).toFixed(2) + "ms");
}

module.exports = footer;
