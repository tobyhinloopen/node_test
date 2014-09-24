function tag(res, tagname, content, attrs) {
  starttag(res, tagname, attrs);
  if(content && (""+content).length > 0)
    text(res, content);
  endtag(res, tagname);
}

function starttag(res, tagname, attrs) {
  res.write("<" + tagname + serializeAttributes(attrs) + ">");
}

function text(res, content) {
  res.write(escapeHtmlEntities(content));
}

function endtag(res, tagname) {
  res.write("</" + tagname + ">");
}

function doctype(res) {
  res.write("<!DOCTYPE html>");
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
