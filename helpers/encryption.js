"use strict";
const crypto = require('crypto');

const SECRET = "SOMGAs324gdf6JHKJLtlXCvmzxnkasOU$*#ITiyodfasZVXRUWN8dflk3425kwlerjtgewlrksgKWERJty";
const ALGORITHM = "aes-256-ctr";

function Encryption() {}

Encryption.prototype.salt = function() {
  return crypto.randomBytes(32).toString('hex').slice(0,32);
}

Encryption.prototype.digest = function(plaintext) {
  const hash = crypto.createHash('sha256');
  hash.update(plaintext);
  hash.update(SECRET);
  return hash.digest('hex');
}

Encryption.prototype.encipher = function(plaintext) {
  const cipher = crypto.createCipher(ALGORITHM, SECRET);
  var encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

Encryption.prototype.decipher = function(crypttext) {
  const decipher = crypto.createCipher(ALGORITHM, SECRET);
  var deciphered = decipher.update(crypttext, 'hex', 'utf8');
  deciphered += decipher.final('utf8');
  return deciphered;
}

module.exports = new Encryption();
