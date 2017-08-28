'use strict';
const net = require('net');
const util = require('util');

let clients = {};
const server = net.createServer(function (socket) {
    let name;
    server.getConnections(function (err, count) {
        socket.write(count +'welcome please input your name\r\n>', 'utf8');
    });

    socket.on('data', function (data) {
        data.replace(/\r\n/, '');
        if (name) {
            broadcast(name, name + ' : ' + data + '\r\n')
        } else {
            name = data;
            clients.name = socket;
            broadcast(name, name + ' join in chat\r\n');
        }
    });

    socket.on('end', function () {
        broadcast(name, name + 'leave char room\r\n');
        clients[name].destroy();
        delete clients.name;
    });

    socket.on('error', function () {

    });
    socket.on('close', function () {

    })
});

function broadcast(name, msg) {
    for (let n in clients) {
        if (n !== name) {
            clients.name.write(msg);
        }
    }
}

server.listen(8000);