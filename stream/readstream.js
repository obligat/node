'use strict';
const fs = require('fs');

let rs = fs.createReadStream('read.txt', {
    start:0,end:5,encoding:'utf8',highWaterMark:3
});

rs.setEncoding('utf8');
rs.on('open',function () {
    console.log('open');
});

rs.resume();

setTimeout(function () {
    rs.on('data',function (data) {
        console.log(data);
    })
},1000);
/*
rs.on('data',function (data) {
    console.log(data);
    // rs.pause();
    // setTimeout(function () {
    //     rs.resume();
    // }, 3000);
});
*/

rs.on('end',function () {
    console.log('over');
});