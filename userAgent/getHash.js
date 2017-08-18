'use strict';
const cryto = require('crypto');
function getHash(str) {
    let result = cryto.createHash('sha1');
    return result.update(str).digest('hex');
}

console.log(getHash('1'));
console.log(getHash('324334434'));
