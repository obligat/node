'use strict';
const fs = require('fs');

fs.readFileSync('index.txt', {encoding: 'utf8', flag: 'r'});

fs.readFile('index.txt', {encoding: 'utf8', flag: 'r'}, function (err, data) {

    console.log(data);
});

fs.writeFileSync('index.txt', 'la black ', {flag: 'w', encoding: 'utf8'}, function (err, data) {
    console.log(err);
    console.log(data);
});

// up line go down.  change 'w' -> 'a'
fs.writeFileSync('index.txt', new Buffer('la black 2'), {flag: 'a', encoding: 'utf8'}, function (err, data) {
    console.log(err);
    console.log(data);
});

fs.appendFile('index.txt', new Buffer('la black 3'));

/*base64 把3个8位字节 转化成4个6位字节 然后在6位字节前补两个0*/

let buffer = new Buffer('大眼萌');
//<Buffer e5 a4 a7 e7 9c bc e8 90 8c>
let arr = 'e5 a4 a7 e7 9c bc e8 90 8c'.split(' ');

function encodeBase64(arr) {
    let res = [];
    let reg = getRange();
    let str = arr.map(item => parseInt(item, 16).toString(2)).join('');   // 获得二进制字符串
    for (let i = 0; i < str.length; i++) {
        if (i % 6 === 0) {
            res.push('00' + str.substr(i, 6));    // 将二进制字符串（24位：3*8）6位一分隔，并在前面补两个0
        }
    }
    res = res.map(item => parseInt(item, 2));     // 将二进制转为十进制

    return res.reduce((str, cur) => {               // 根据规则得出结果
        str += reg[cur];
        return str;
    }, '')
}

console.log(encodeBase64(arr));  //5aSn55y86JCM

function getRange() {
    let str = '';
    for (let i = 65; i <= 90; i++) {
        str += String.fromCharCode(i);
    }

    for (let i = 97; i <= 122; i++) {
        str += String.fromCharCode(i);
    }

    str += '0123456789+/';
    return str;

}



