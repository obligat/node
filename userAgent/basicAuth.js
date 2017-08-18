'use strict';
const http = require('http');


http.createServer(function (req, res) {

    let auth = req.headers['authorization'];
    if (auth) {

        let area = auth.slice(6);
        let pairs = new Buffer(area, 'base64').toString().split(':');

        if (pairs[0] === pairs[1]) {   // just test logic
            res.end('ha la');
        }
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area');
        res.writeHead(401);
        res.end();
    }
    if (req.url !== '/favicon.ico') {
        res.end(req.url);
    } else {
        res.end('404');
    }
}).listen(8083);

/*
* req.headers
{ host: 'localhost:8080',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  authorization: 'Basic ZWU6MTE=',
  'upgrade-insecure-requests': '1',

* */
