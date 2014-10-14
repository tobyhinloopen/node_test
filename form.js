var html = require("./html");

function form(resource, action, fn) {
  var builder = new FormBuilder(resource);
  return html.starttag("form", { action: action, method: "post" }) + fn(builder, resource)
      + "</form>";
}

function FormBuilder(resource) {
  this.resource = resource;
}

FormBuilder.prototype = {
  input: function(property, options) {
    options = options || {};
    return this.label(property, this.field(property, options.attrs));
  },
  label: function(property, content, attrs) {
    return html.starttag("label", attrs) + html.text(property) + content + "</label>";
  },
  field: function(property, attrs) {
    attrs = attrs || {};
    var value = this.resource[property] || "";
    if(!attrs.value && (""+value).length)
      attrs.value = ""+value;
    if(!attrs.name)
      attrs.name = property;
    return html.starttag("input", attrs);
  },
  submit: function() {
    return html.starttag("input", { type: "submit" });
  }
};

module.exports = form;
