function tag(tagname, content, attrs) {
  return starttag(tagname, attrs)
    + (content && (""+content).length > 0 && text(content) || "")
    + endtag(tagname);
}

function starttag(tagname, attrs) {
  return "<" + tagname + serializeAttributes(attrs) + ">";
}

function text(content) {
  return escapeHtmlEntities(content);
}

function endtag(tagname) {
  return "</" + tagname + ">";
}

function doctype() {
  return "<!DOCTYPE html>";
}

function serializeAttributes(attrs) {
  var str = "";
  if(attrs)
    for(var key in attrs)
      str += " " + key + "=" + quoteAttributeValue(attrs[key]);
  return str;
}

function quoteAttributeValue(value) {
  if(value.match(/\s/))
    return '"'+ escapeAttributeEntities(value) +'"';
  else
    return escapeAttributeEntities(value);
}

function escapeAttributeEntities(value) {
  return escapeHtmlEntities(value).replace('"', "&quot;");
}

function escapeHtmlEntities(value) {
  return value.replace("&", "&amp;").replace("<", "&gt;").replace(">", "&lt;");
}

module.exports = {
  tag: tag,
  starttag: starttag,
  endtag: endtag,
  doctype: doctype,
  text: text,
  escape: escapeHtmlEntities
};
