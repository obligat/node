const fs = require('fs');
const connect = require('./connect');
let articles = {
    "1": "first article",
    "2": "second article",
    "3": "third article"
};

let app = connect();

require('./middleware')(app);


app.use("/article", function (req, res) {


    /*fs.createReadStream('./detail.html','utf8',function (err, data) {
        data = data.replace('<%=content%>', articles[res.query.id]);
        return data;
    });*/
    res.render('detail.html', {content: articles[req.query.id]});
});
app.use("/", function (req, res) {
    fs.createReadStream('./index.ejs').pipe(res);
    // res.send('<ul><li><a href="/article?id=1">first</a></li>')
});
app.use(function (req, res) {

    res.send("404");
});


/*app.use(function (req, res) {
    if (req.pathname == '/') {
        res.send('<ul><li><a href="/article?id=1">first</a></li>')
    } else if (req.pathname == '/article') {
        res.send(articles[req.query.id]);
    } else {
        res.send("404");
    }
});*/

app.listen(8080);

/*let server = http.createServer(app);
server.listen(8080);*/

