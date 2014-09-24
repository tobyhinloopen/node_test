var starttag = require("./html").starttag;

function style(res) {
  starttag(res, "link", { href: "style.css", rel: "stylesheet", type: "text/css" });
}

module.exports = style;
