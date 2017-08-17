var express = require('express');
var app = express();

app.set('view engine', 'html');
app.set('views', __dirname);

app.engine('html', require('ejs').__express);
app.get('/',function (req, res) {
    res.render('index',{
        name:'aaa',
        age:43
    })
});

app.listen(8883);