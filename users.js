var menu = require("./menu"),
    footer = require("./footer"),
    style = require("./style"),
    html = require("./html"),
    table = require("./table"),
    form = require("./form");
    querystring = require("querystring"),
    users = exports;

users.repository = null;

users.index = function(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.write(html.doctype() + html.title("Users index") + style() + menu("/users"));

  users.repository.findAll(function(collection) {
    var tableHtml = table(collection, function(t, user) {
      return t.item("name") + t.item("email", { as: mailto });
    });
    res.end(tableHtml + html.linkto("New user", "/users/new", { class: "button" }) + footer(starttime));
  });
};

users.new = function(res) {
  var starttime = process.hrtime();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

  var formhtml = form({ name: "", email: "" }, "/users", function(f) {
    return f.input("name") + f.input("email") + f.submit();
  });

  res.end(html.doctype() + html.title("Users - create") + style() + menu("/users/new") + formhtml
      + footer(starttime));
};

users.create = function(res, req) {
  var postbody = "";

  req.on("data", function(chunk) {
    postbody += chunk.toString();
  });

  req.on("end", function() {
    var params = querystring.parse(postbody);
    users.repository.create(params);
    res.writeHead(302, { "Location": "/users" });
    res.end();
  });
};

function mailto(email) {
  return html.tag("a", email, { href: "mailto:" + email });
}
