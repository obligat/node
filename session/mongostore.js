var app = require('express')();
var session = require('express-session');
var FileStore = require('./fileStore')(session);

app.use(session({
    secret: 'secret',
    resave: true,
    cookie: {
        maxAge: 60 * 1000
    },
    // store: new FileStore(),
    saveUninitialized: true,
    store:new FileStore({dir:'./sessions'})

}));

app.get('/save', function (req, res) {
    req.session.name = 'minions';
    res.end('over');
});

app.get('/read', function (req, res) {
    res.send(req.session.name);
});

/*
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/');

app.use(session({
    secret:'secret',
    key:'key',
    cookie:{maxAge: 1000 * 60 * 60},
    resave:true,
    saveUninitialized:true,
    store:new mongoStore({
        mongooseConnection:mongoose.mongooseConnection
    })
}));
*/

app.listen(8080);