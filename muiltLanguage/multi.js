'use strict';
const express = require('express');
const path = require('path');
const app = express();



app.use(checkLanguage(['en', 'zh']));

app.get('/', function (req, res) {
    res.setHeader('Content-Language', req.acceptLang);
    res.sendFile(path.join(__dirname, req.acceptLang, 'index.html'));
});

app.listen(8080);

function checkLanguage(lang) {
    function matchLang(str) {
        return str.toLowerCase().split(',').map((item) => {
            let pair = item.split(';');
            return {name: pair[0], q: pair[1] || 1}
        }).filter(item => lang.indexOf(item.name) !== -1).sort((pre, next) => pre.q - next.q).map(item => item.name)
    }

    return (req, res, next) => {
        let acceptLang = req.headers['accept-language'];
        req.acceptLang = matchLang(acceptLang)[0] || lang[0];
        next()
    }
}