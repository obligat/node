'use strict';
const fs = require('fs');

fs.open('data3.txt', 'w', function (err, fd) {
    fs.write(fd, new Buffer('ok no no ko'), 3, 6, 0, function (err, bytesWritten) {
        // console.log(bytesWritten); // 6
        console.log('la'+fd);   // bo10
        fs.close(fd);
    })
});

fs.open('data3.txt','w',function (err, fd) {
    console.log('bo'+fd)   // 10 变为了 la9
});