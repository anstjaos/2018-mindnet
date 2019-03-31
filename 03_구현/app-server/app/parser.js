exports.parseQuery = function (query) {
    var result = '{';
    
    if (query.query != null) {
        // query에 해당하는 문자열을 '|'로 나누어 field query 추출
        var query = query.query.split('|');
        // 각 field query에 대해 mongoose에 맞는 형식으로 변환
        query.forEach(element => {
            var splitStr = element.split(':');
            // query option이 존재하는 경우
            if (splitStr[2] != null) {
                switch (splitStr[2]) {
                    case 'like':
                        result += `"${splitStr[0]}":{"$regex": "${splitStr[1]}"},`;
                        break;
                }
            }
            else
                result += `"${splitStr[0]}":"${splitStr[1]}",`;
        });

        result = result.substr(0, result.length - 1);
    }

    result = `${result}}`;
    return JSON.parse(result);
}

exports.parseField = function (query) {
    var result = '{';

    if (query.fields != null) {
        var fields = query.fields.split('%');
        fields.forEach(element => {
            var splitStr = element.split(':');
            result += `"${splitStr[0]}":${splitStr[1]},`;
        });

        result = result.substr(0, result.length - 1);
    }

    result = `${result}}`;
    return JSON.parse(result);
}