'use strict';
const http = require('http');
const fs = require('fs');

function send(filename, req, res) {
    fs.readFile(filename,(err,data)=>{
        console.log(111);
        let expires = new Date(Date.now() + 10 * 1000);
        res.setHeader('Expires', expires.toUTCString());
        res.setHeader('Cache-Control', 'max-age=60');
        res.end(data);
    })
}

http.createServer(function (req, res) {
    console.log(req.url);
    if(req.url !== '/favicon.ico'){
        let filename = req.url.slice(1);
        send(filename, req, res);
    }else{
        res.end('404');
    }
}).listen(8080);
