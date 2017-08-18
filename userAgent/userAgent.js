'use strict';

const express = require('express');
const agentParser = require('user-agent-parser');
const app = express();

let visit = {mobile: 0, other: 0};

app.use(function (req, res, next) {
    req.agent = agentParser(req.headers['user-agent'] || '');
    next();
});

app.get('/', function (req, res) {
    console.log(req.agent);
    if (req.agent.device.type === 'mobile') {
        visit.mobile = visit.mobile + 1;
    } else {
        visit.other = visit.other + 1;
    }
    // res.send(req.agent);

    res.send(visit);
});

app.listen(8080);

/*
my localhost:8080 return parsed user agent:

{ browser: { name: 'Chrome', version: '59.0.3071.115', major: '59' },
    engine: { name: 'WebKit', version: '537.36' },
    os: { name: 'Linux', version: 'x86_64' },
    device: { model: undefined, vendor: undefined, type: undefined },
    cpu: { architecture: 'amd64' } }
*/
