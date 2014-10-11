var html = require("./html");

function table(collection, fn) {
  var tablehtml = "<table><thead><tr>" + fn(thead) + "<tbody>";

  for(var i=0; i<collection.length; i++)
    tablehtml += "<tr>" + fn(tbody, tbody.resource = collection[i]);

  return tablehtml + "</table>";
}

var thead = {
  item: function() {
    var opts = parseArguments(arguments);
    return html.starttag("th", opts.attrs) + html.text(opts.getters.join(" "));
  }
};

var tbody = {
  resource: null,
  item: function() {
    var opts = parseArguments(arguments);
    var value = resolveResourceWithGetters(this.resource, opts.getters);
    return html.starttag("td", opts.attrs)
        + (typeof opts.as == "function" ? opts.as(value) : html.text(value));
  }
};

function parseArguments(args) {
  var opts = {}, extraOpts;
  opts.getters = Array.prototype.slice.call(args);
  if(typeof opts.getters[args.length-1] == "object")
    extraOpts = opts.getters.pop();
  for(var x in extraOpts)
    opts[x] = extraOpts[x];
  return opts;
}

function resolveResourceWithGetters(resource, getters) {
  for(var i=0, value = resource, getter; (getter = getters[i]) && value; i++)
    value = value[getter];
  return value;
}

module.exports = table;
