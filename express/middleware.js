const url = require('url');
const fs = require('fs');
module.exports = function (app) {
    app.use(function (req, res, next) {
        let urlObj = url.parse(req.url, true);
        let pathname = urlObj.pathname;
        let query = urlObj.query;
        req.path = pathname;
        req.query = query;
        next()
    });

    app.use(function (req, res, next) {
        res.render = function (path, data) {
            let str = fs.readFileSync(path, 'utf8');
            let tpl = str.replace(/<%=([\s\S]+?)%>/g, function (match, group) {
                return "'+obj." + group + "+'";
            });

            tpl = "let tpl ='" + tpl + "'\n return tpl;";

            let compile = new Function('obj', tpl);
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

