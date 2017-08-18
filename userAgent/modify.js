'use strict';
const fs = require('fs');
const express = require('express');

const http = require('http');

function send(filename, req, res) {
    let lastModified = new Date(req.headers['if-modified-since']);
    fs.stat(filename,(err,stat)=>{
        if(stat.mtime.getTime() === lastModified.getTime()){
            res.statusCode = 304;
            res.end();
        }else{
            res.writeHead(200, {'Last-Modified': stat.mtime.toGMTString()});
            fs.createReadStream(filename).pipe(res);
        }
    })
}

http.createServer(function (req, res) {
    if (req.url !== '/favicon.ico') {
        let filename = req.url.slice(1);  // index.html
        // console.log(req.url); // /index.html
        send(filename, req, res);
    } else {
        res.end('404');
    }
}).listen(8081);