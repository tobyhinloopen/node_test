module.exports = function() {
  require("child_process").exec("ifconfig | grep 'inet '", function(err, stdout, stderr) {
    if(err) return console.error(err);
    var ips = [];
    stdout.replace(/inet\s(\d+\.\d+\.\d+\.\d+)/g, function(_, ip) { ips.push(ip); });
    console.log("Network IPs: " + ips.join(", "));
  });
};
