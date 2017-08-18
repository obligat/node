'use strict';
const fs = require('fs');
const express = require('express');
const crypto = require('crypto');
const http = require('http');

function getHash(str) {
    let result = crypto.createHash('sha');
    return result.update(str).digest('base64');
}

function send(filename, req, res) {
    let ifNoneMatch = req.headers['if-none-match'];
    let data = fs.readFileSync(filename).toString();
    console.log(ifNoneMatch);
    if (ifNoneMatch === getHash(data)) {
        res.statusCode = 304;
        res.end();
    } else {
        res.writeHead(200, {'ETag': getHash(data)}); // ?? 这里不会写，
        fs.createReadStream(filename).pipe(res);
    }
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