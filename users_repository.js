var assert = require("assert");

function UsersRepository(collection) {
  this.collection = collection;
}

UsersRepository.prototype.findAll = function(cb) {
  this.collection.find({}).toArray(function(err, users) {
    assert.equal(err, null);
    cb(users);
  });
}

UsersRepository.prototype.create = function(user, cb) {
  this.collection.insert([{ name: user.name, email: user.email }], function(err, users) {
    assert.equal(err, null);
    cb && cb(users[0]);
  });
}

module.exports = UsersRepository;
