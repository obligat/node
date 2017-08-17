var url = require('url');
var fs = require('fs');
module.exports = function (app) {
    app.use(function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        var pathname = urlObj.pathname;
        var query = urlObj.query;
        req.path = pathname;
        req.query = query;
        next()
    });

    app.use(function (req, res, next) {
        res.render = function (path, data) {
            var str = fs.readFileSync(path, 'utf8');
            var tpl = str.replace(/<%=([\s\S]+?)%>/g, function (match, group) {
                return "'+obj." + group + "+'";
            });

            tpl = "var tpl ='" + tpl + "'\n return tpl;";

            var compile = new Function('obj', tpl);
            this.send(compile(data));
        };

        next();
    });

    app.use(function (req, res, next) {
        res.send = function (html) {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
            res.send(html);
        };
        next()

    });


};

