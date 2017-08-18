var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('miYao'));   // secret key encryption
// app.use(cookieParser());

function checkLogin(req, res, next) {
    if(req.cookies && req.cookies.username) {
        next()
    }else{
        res.redirect('/');
    }
}

app.set('view engine', 'html');
app.set('views', __dirname);
app.engine('html', require('ejs').__express);

app.get('/',function (req, res) {
    res.render('index');
});

app.get('/login',function (req, res) {
    res.cookie('username', req.query.username,{signed:true});  // 防cookie被篡改
    // res.end(req.query.username);    // cookie 被存到客户端，url 为 localhost:8080/login?username=xxx ，界面显示 xxx
    res.redirect('/user');

    /*res.statusCode = 302;              // mock redirect
    res.setHeader('Location','/user');  // key: Location, value: /user
    res.end();*/
});

app.get('/user',checkLogin,function (req, res) {


    res.render('user',{username:req.cookies.username});

});

app.listen(8080);