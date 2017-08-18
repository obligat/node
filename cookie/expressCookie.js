var express = require('express');
var cookieParser = require('cookie-parser');
var queryStirng = require('querystring');
var app = express();
// app.use(cookieParser());

app.use(function (req, res, next) {

    req.cookies = queryStirng.parse(req.headers.cookie, '; ', '='); // notice white space after semicolon

    req.cookie = cookie;
    next();
});

app.get('/a', function (req, res) {
    if (req.cookies.visited) {
        res.send('see you again');
    } else {
        res.cookie('visited', 1, {httpOnly:true});
        res.send('welcome new friend');
    }
});
app.get('/b', function (req, res) {
    if (req.cookies.visited) {
        res.send('see you again');
    } else {
        res.send('welcome new friend');
    }
});
app.get('/', function (req, res) {
    console.log(req.cookies);
    if (req.cookies.visited) {
        res.send('see you again');
    } else {
        res.cookie('name', 'bbb',{httpOnly:true});
        res.cookie('visited', 3, {maxAge: 60 * 1000});  // 10 mins
        res.send('welcome new friend');
    }
});

app.listen(8080);

function cookie(key, value, options) {
    var opt = options || {};
    var pairs = [key + '=' + value];

    if (opt.maxAge) {
        pairs.push('Max-Age=' + Number(opt.maxAge));
    }
    if (opt.domain) {
        pairs.push('Domain=' + opt.domain);
    }
    if (opt.path) {
        pairs.push('Path=' + opt.path);
    }
    if (opt.httpOnly) {
        pairs.push('HttpOnly');
    }
    if (opt.expires) {
        pairs.push('Expires=' + opt.expires.toUTCString());
    }
    if (opt.secure) {
        pairs.push('Secure');
    }

    return pairs.join(';')

}