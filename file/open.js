'use strict';
const fs = require('fs');


let fd = fs.openSync('index.txt', 'r');  // 文件名索引
console.log(fd);   // 9 文件描述符?
/*

process.stdout.write();
process.stdin;
process.stderr;*/


let buffer = new Buffer(9);
/*
* buffer 存放数据的容器
* offset 往buffer里写的偏移量
* length 长度
* position 文件的当前读取位置
* */
fs.readSync(fd, buffer, 0, 9, 0);
console.log(buffer.toString());  // 读出来啦 ‘la black ’


