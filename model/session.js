const sqlite3 = require('sqlite3');
const encryption = require('../helpers/encryption');

var db = new sqlite3.Database('./data/roster.sqlite3');

module.exports = {
  loadSession: loadSession,
  validateSession: validateSession
}

function loadSession(req, res, next) {
  var cookie = req.headers.cookie;
  var match = /session=(.+)/.exec(cookie);
  if (match) {
    console.log('Session: ' + encryption.decipher(match[1]));
    req.session(encryption.decipher(match[1]));
  }
  next(req, res);
}

function validateSession(username, cryptedPassword, callback) {
  db.get('SELECT * FROM users WHERE username=?', username, function(err, user) {
    if (err) {
      console.error(err);
      return callback(err);
    }
    if (!user) {
      return callback("No matching user");
    }
    if (user.cryptedPassword == encryption.digest(password + user.salt)) {
      // First param of the callback is the error, since successful it is false
      callback(false, user)
    }

  });
}
