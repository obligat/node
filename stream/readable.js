'use strict';
const fs = require('fs');

let rs = fs.createReadStream('read.txt',{
    start:0,end:20,highWaterMark:5
});

let buffers = [];
rs.on('readable',function () {
    console.log('------');
    // console.log(rs.read(1));
    let data;
    while(null !==(data = rs.read(1))){
        buffers.push(data);
    }
});

rs.on('end',function () {
    let data = Buffer.concat(buffers);
    console.log(data.toString());   // 设encoding 报错
});