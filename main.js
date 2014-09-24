var http = require("http"),
    homepage = require("./homepage"),
    jsontest = require("./jsontest"),
    asset = require("./asset");

http.createServer(function(req, res) {
  switch(req.url) {
    case "/style.css":
      asset(res, "./style.css", "text/css");
      break;
    case "/jsontest":
      jsontest(res);
      break;
    default:
      homepage(res);
  }
}).listen(3000);
