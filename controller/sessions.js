const view = require('../view/view.js');
const parseBody = require('../helpers/parse-body');
const encryption = require('../helpers/encryption');
const sessionModel = require('../model/session');

module.exports = {
  loginForm: loginForm,
  login: login,
  logout: logout
}

function loginForm(req, res) {
  res.statusCode = 200;
  res.end(view.render('sessions\\login.html', {message: ""}));
}

function login(req, res) {
  parseBody(req, res, function(req, res) {
    //if (req.body.username == "foo" && req.body.password == "bar") {
    sessionModel.validateSession(req.body.username, req.body.password, function(err, userid) {
      var sessionData = { user_id: 'Frank'}
      var cookieData = encryption.encipher(JSON.stringify(sessionData));
      res.statusCode = 200;
      res.setHeader('Set-Cookie', "session=" + cookieData + ";httpOnly");
      res.end("Logged in.");
    } else {
      res.statusCode = 403;
      res.end(view.render('sessions\\login.html', {message: "No matching username/password found."}));
    }
  });
}

function logout(req, res) {
  res.statusCode = 200;
  res.setHeader('Set-Cookie', "session=null;httpOnly");
  res.end("Logged out.");
}
