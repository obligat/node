'use strict';
const fs = require('fs');

let rs = fs.createReadStream('read.txt');
let ws = fs.createWriteStream('write.txt');

rs.pipe(ws);

rs.on('data',function (data) {
    let flag = ws.write(data);
    if(!flag){
        rs.pause();
    }
});

ws.on('drain',function () {
    rs.resume();
});