var html = require("./html"),
    tag = html.tag,
    starttag = html.starttag,
    endtag = html.endtag,
    text = html.text;

function menu() {
  return starttag("p")
    + tag("a", "Home",      { href: "/" })
    + text(" ")
    + tag("a", "JSON test", { href: "/jsontest" })
    + endtag("p");
}

module.exports = menu;
