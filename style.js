var starttag = require("./html").starttag;

function style(res) {
  return starttag("link", { href: "style.css", rel: "stylesheet", type: "text/css" });
}

module.exports = style;
