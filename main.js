var http = require("http"),
    homepage = require("./homepage"),
    jsontest = require("./jsontest"),
    users = require("./users"),
    asset = require("./asset"),
    printIpAddresses = require("./print_ip_addresses"),
    logReqRes = require("./log_req_res"),
    MongoClient = require("mongodb").MongoClient,
    MONGO_URL = "mongodb://localhost:27017/node_test",
    UsersRepository = require("./users_repository");

function connectMongoClient(cb) {
  MongoClient.connect(MONGO_URL, function(err, db) {
    if(err) return console.error(err);
    console.log("Connected to "+MONGO_URL.replace("mongodb://", ""));
    cb && cb(db);
  });
}

function setupWithDb(db) {
  users.repository = new UsersRepository(db.collection("users"));
}

function startHttpServer(db, cb) {
  http.createServer(function(req, res) {
    logReqRes(req, res);
    switch(req.url) {
      case "/_.css":
        asset(res, "./style.css", "text/css");
        break;
      case "/jsontest":
        jsontest(res);
        break;
      case "/users":
        if(req.method == "POST")
          users.create(res, req);
        else
          users.index(res);
        break;
      case "/users/new":
        users.new(res);
        break;
      default:
        homepage(res);
    }
  }).listen(3000);
  console.log("Listening on 0.0.0.0:3000, CTRL+C to stop");
}

printIpAddresses();
connectMongoClient(function(db) {
  setupWithDb(db);
  startHttpServer();
});
