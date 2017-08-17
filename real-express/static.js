var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'public')));

/*app.use(express.static(path.join(__dirname,'public'),{
    dotfiles:'deny',
    index:'other.html',
    setHeaders:function (res) {
        res.setHeader('name','ddd');
    }
}));*/

/*app.use(function (req, res, next) {
   var rs =  fs.createReadStream(path.join(__dirname,'public',req.path))
    rs.on('error',function () {
        next()
    });
    rs.pipe(res);
});*/
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