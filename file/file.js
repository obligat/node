'use strict';
const fs = require('fs');

const data = fs.readFileSync('index.txt');

console.log(data);

fs.readFile('data2.txt','utf8',function (err, data) {
    console.log(data);
});
fs.readFile('index.txt','utf8',function (err, data) {
    console.log(data);
});

