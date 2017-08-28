'use strict';
const net = require('net');
const util = require('util');

// net.Socket 双工流
const server = net.createServer({allowHalfOpen: false},function (socket) {
    console.log(util.inspect(socket.address()));
    server.getConnections(function (err, count) {
        console.log(count);
    });
    socket.on('error',function (err) {
        console.log(err);
        socket.destroy();
    });
});

server.on('error',function (err) {
    console.log(err);
});

server.listen(8000,'localhost',500,function () {
    console.log(util.inspect(server.address()));
});

/*{ address: '127.0.0.1', family: 'IPv4', port: 8000 }*/