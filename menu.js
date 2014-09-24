var html = require("./html"),
    tag = html.tag,
    starttag = html.starttag,
    endtag = html.endtag,
    text = html.text;

function menu(res) {
  starttag(res, "p");
  tag(res, "a", "Home",      { href: "/" });
  text(res, " ");
  tag(res, "a", "JSON test", { href: "/jsontest" });
  endtag(res, "p");
}

module.exports = menu;
