'use strict';
const fs = require('fs');

let buffer = new Buffer(10);

/*
* buffer 存放数据的容器
* offset 往buffer里写的偏移量
* length 长度
* position 文件的当前读取位置
* */

//index.txt:  la black la black 2la black 3

/*
fs.open('index.txt','r',function (err, fd) {
    fs.read(fd,buffer,0,2,0,function (err, bytesRead, buffer) { // 从第0个开始读，读两个
        console.log(bytesRead);   // 2

        fs.read(fd,buffer,3,6,6,function (err, bytesRead) {   // 从第3个开始读，读6个
            console.log(bytesRead);           // 6
            console.log(buffer.toString());  // la ck la
        });
        console.log(buffer.toString());  // la

    })
});*/

let list = [];

fs.open('data2.txt','r',function (err, fd) {
    let pos = 0;
    function read() {
        let buffer = new Buffer(4);
        fs.read(fd,buffer,0,4,pos,function (err, bytesRead) {
            list.push(buffer);
            pos += bytesRead;
            if(bytesRead>0){
                read();
            }else{
                let result = Buffer.concat(list);
                console.log(result.slice(0,pos).toString());  // slice(0,pos) 处理多余的字节

            }
        });
    }
    read();
});
