require('date-utils');

exports.getDate = function() {
    var date = new Date();
    return date.toFormat('YYYY-MM-DD HH24:MI:SS');
}

exports.getImageDate = function() {
    var date = new Date();
    return date.toFormat('YYYYMMDDHH24MISS');
}