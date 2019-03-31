var Date = require('./date');

exports.log = function(tag, msg) {
    console.log('[' + tag + '] [' + Date.getDate() + '] ' + msg);
}