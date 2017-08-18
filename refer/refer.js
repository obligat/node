const express = require('express');
const path = require('path');
const app = express();

// judge has power ?
app.use('/img',function (req, res,next) {
    let whiteList = ['a.com', 'b.com'];  // set white list
    let referer = req.headers.referer;
    if(!referer){
        return next();
    }
    // next();
    let referHost = require('url').parse(referer).host.split(':');
    if(referHost === req.host){
        return next();
    }
    res.sendFile(path.join(__dirname, 'img', 'wrong.jpg'));
});

app.use(express.static(__dirname));


// return html
app.get('/',function (req, res) {
    res.sendFile(path.join(__dirname, 'img.html'));
});

app.listen(8080);