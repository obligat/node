var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('uuid');

var app = express();
app.use(cookieParser());
/*app.use(session({
    secret: 'keyKey',
    cookie: {maxAge: 60 * 1000 * 20},
    resave: true,       // is every time save session?
    saveUninitialized: true  // auto save uninitialized session
}));*/

app.use(mySession());

app.get('/', function (req, res) {
    if (req.session.sign) {
        console.log(req.session);
        /*Session {
  cookie:
   { path: '/',
     _expires: Fri Aug 18 2017 14:21:59 GMT+0800 (CST),
     originalMaxAge: 1200000,
     httpOnly: true },
  sign: true,
  name: 'ba la la' }*/
        req.session.count = req.session.count + 1;
        res.send('welcome' + req.session.name + req.session.count)
    } else {
        req.session.sign = true;
        req.session.name = 'ba la la';
        req.session.count = 1;
        res.send('hello , welcome');
    }
});

app.listen(8080);

function mySession(options) {
    var options = options || {};
    var data = {};
    return function (req, res, next) {
        var sid = options.name || 'connect.sid';
        var sessionId = req.cookies[sid] || (options.genid ? options.genid() : uuid.v4()); // without (options.genid) throw error options.genid is not a function

        res.cookie(sid, sessionId, options.cookie || {
            maxAge: 60 * 1000
        });

        req.session = data[sessionId] || {};
        
        // when response finished , save session value into data
        res.on('finish', function () {
            if (Object.keys(req.session).length > 0 || options.saveUninitialized) {

                data[sessionId] = req.session
            }

        });

        next();
    };

}

/*function mySession() {
    var data = {};
    return function (req,res,next) {
        var sessionId = req.cookies['connect.sid'] || uuid.v4();
        res.cookie('connect.sid', sessionId,{
            maxAge:60*1000
        });
        req.session = data[sessionId] || {};

        // when response finished , save session value into data
        res.on('finish',function () {
            data[sessionId] = req.session
        });

        next();
    }

}
*/