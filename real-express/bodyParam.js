var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');  // only support json urlencoded
var app = express();


app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json()); // 处理json
app.use(bodyParser.urlencoded({extended: true})); // form {extended:true} use node chu li  query

app.post('/post',function (req, res) {
    res.send(req.body);  // return json
});

app.use(function (req, res, next) {
    console.log(req.headers['content-type']);   // form-data multipart/form-data
    next();
});

app.get('/',function (req, res) {
    res.render('index',{
        name:'aaa',
        age:43
    })
});

app.listen(8883);