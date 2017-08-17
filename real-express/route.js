var express = require('express');

var app = express();

app.get('/list',function (req, res) {
    res.send('list ' + req.query);

});
app.post('/list/:id/:name',function (req, res) {
    // {id:'xxx',name:'xxx'}
    res.send('list ' + req.params);

});
app.post('/list/:id/:name',function (req, res) {
    // {id:'xxx',name:'xxx'}
    res.send('list ' + req.params);

});
app.post('/list/:id/:name',function (req, res) {
    // {id:'xxx',name:'xxx'}
    res.send('list ' + req.params);

});
app.all('/host',function (req, res) {
    console.log(req.path);
    console.log(req.host);
    res.send('list ' + req.url);

});
app.all('*',function (req, res) {
    res.send('not exist');

});

app.listen(8000);



