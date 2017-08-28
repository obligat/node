'use strict';
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('message',function (msg, rinfo) {
    console.log(msg);
    console.log(rinfo);
});

socket.send(new Buffer('minion'),0,6,80,'localhost',function (err, bytes) {
    console.log('send %d', bytes);
});