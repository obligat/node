'use strict';
const fs = require('fs');

let rs = fs.createReadStream('read.txt');
let ws = fs.createWriteStream('write.txt',{
    autoClose:true
});

ws.on('open',function () {
    console.log('open ws');
});

rs.on('data',function (data) {
    ws.write(data)
});

rs.on('end',function () {
   /* ws.end('write over',function () {
        console.log('write over');
        console.log('all bytes %d', ws.bytesWritten);
    });*/
});

ws.on('close',function () {
    console.log('file close');
});