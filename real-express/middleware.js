var express = require('express');

var app = express();

app.use(function (req, res,next) {
    req.money = 1000;
    console.log(req.money);
    next();
});
app.use(function (req, res,next) {
    req.money = req.money - 10;
    console.log(req.money);
    next();
});
app.use(function (req, res,next) {
    req.money = req.money - 10;
    console.log(req.money);
    next();

});


app.all('*',function (req, res) {
    res.send('not found');
});

app.listen(8800);