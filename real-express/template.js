var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.get('/',function (req, res) {
    res.render('index',{
        name:'aaa',
        age:43
    })
});

app.listen(8888);