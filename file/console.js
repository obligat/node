'use strict';

const fs = require('fs');
/*
* 0 -> stdin
* 1 -> stdout
* 2 -> stderr
* */

fs.write(0, 'party', function (err) {

});

setTimeout(function () {
    let buffer = new Buffer(10);
    fs.read(0, buffer, 0, 1, 0, function (err) {
        console.log(buffer);
    })
}, 3000);

setInterval(function () {

}, 1000);


process.stdin.on('data', function (err, data) {
    // console.log(arguments);
});
