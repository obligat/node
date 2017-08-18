'use strict';
const express = require('express');
const proxy = require('http-proxy').createProxyServer();

const app = express();

function proxyParser(config) {
    return (req, res, next) => {
        let target = config[req.hostname];
        proxy.web(req, res, {
            target: target
        });
    }
}

app.use(proxyParser({
    "a.ddd.cn": "http://localhost:8080",
    "b.ddd.com": "http://localhost:9000"
}));

/*
* host file config:
-----------------------
127.0.0.1	a.ddd.cn
127.0.0.1 	b.ddd.com
-----------------------
browser address bar input:

a.ddd.cn:8000  -> 8080
b.ddd.com:8000 -> 9000
* */

app.listen(8000);

const appF = express();

appF.get('/', function (req, res) {
    res.end('8000');
});
appF.listen(8080);

const appTwo = express();
appTwo.get('/', function (req, res) {
    res.end('9000');
});

appTwo.listen(9000);