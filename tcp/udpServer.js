const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('message',function (msg, rinfo) {
    console.log(msg);
    console.log(rinfo);
    socket.send(msg, 0, msg, 80, rinfo.port, rinfo.address);
});

socket.bind(80, 'localhost');