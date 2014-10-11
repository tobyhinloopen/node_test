var html = require("./html");

function menu() {
  return html.starttag("p")
    + html.linkto("Home", "/")
    + " " + html.linkto("JSON test", "/jsontest")
    + " " + html.linkto("Users", "/users");
}

module.exports = menu;
