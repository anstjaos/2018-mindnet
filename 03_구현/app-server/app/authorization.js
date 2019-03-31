var CryptoJS = require("crypto-js");
var Logger = require('./Logger');

var key = 'gooddonghwan';
var authorization_key = 'gooddonghwan';

exports.isAuthorized = function (req) {
    req.query.auth = req.query.auth.replace(/ /gi, '+');
    var bytes = CryptoJS.AES.decrypt(req.query.auth, key);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    if (plaintext != authorization_key) {
        Logger.log('SERVER', 'Not authoized request.');
        return false;
    }
    return true;
}