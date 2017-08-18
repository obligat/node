'use strict';
const express = require('express');
// const proxy = require('http-proxy').createProxyServer();
const request = require('request');
const app = express();
const urlArr = ["http://localhost:8080", "http://localhost:8081"];
const urlArr2 = ["http://localhost:8080", "http://localhost:8081"];

setInterval(function () {

}, 10 * 60 * 1000);

function proxy(req, res, target) {

    function next() {
        let current = target[0];
        request(current, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                return res.end(body)
            } else {
                urlArr.shift();
                next();
            }
        })
    }

    next();

}


function proxyParser(config) {
    return (req, res, next) => {
        let target = config[req.hostname];
        proxy(req, res, target);
    }
}

/*function proxyParser(config) {
    return (req, res, next) => {/!**!/
        let target = config[req.hostname];
        proxy.web(req, res, {
            target: target
        });
    }
}*/

app.use(proxyParser({
    "a.ddd.cn": urlArr2,
    // "b.ddd.com": "http://localhost:9000"
}));

app.listen(8000);

const appF = express();

appF.get('/', function (req, res) {
    res.end('8000');
});
appF.listen(8080);


const appTwo = express();
appTwo.get('/', function (req, res) {
    res.end('8081');
});

appTwo.listen(8081);