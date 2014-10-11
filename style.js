var starttag = require("./html").starttag;

function style(res) {
  return starttag("link", { href: "/_.css", rel: "stylesheet" });
}

module.exports = style;
