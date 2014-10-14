var html = require("./html");

function menu(currentPath) {
  return navbar(currentPath) + breadcrumbbar();
}

function navbar(currentPath) {
  return "<nav class=navbar><ul><li>" + navlink("Home", "/", currentPath)
    + "<li>" + navlink("JSON test", "/jsontest", currentPath)
    + "<li>" + navlink("Users", "/users", currentPath) + "</ul></nav>";
}

function navlink(label, path, currentPath) {
  return html.linkto(label, path, currentPath == path ? { class: "-active" } : null);
}

function breadcrumbbar() {
  return "<nav class=breadcrumbbar><ul><li>" + html.linkto("Home", "/")
    + "<li>" + html.linkto("Users", "/users")
    + "<li>" + html.linkto("New", "/users/new")
    + "</ul></nav>";
}

module.exports = menu;
