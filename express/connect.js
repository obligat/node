var url = require('url');
var http = require('http');
var proto = {};

function createServer() {
    function app(req, res) {
        app.handle(req, res);
    }

    Object.assign(app, proto);
    app.stack = [];

    return app;
}

proto.use = function (route,fn) {
    var handle = fn;
    var route = route;
    if(typeof route !== 'string'){
        handle = route;
        route = "/";
    }
    this.stack.push({handle:handle,route:route});
};

proto.handle = function (req, res) {
    var stack = this.stack;
    var index = 0;

    function next(err) {
        // stack[index++](req, res, next);
        var layer = stack[index++];
        var route = layer.path;
        var handle = layer.handle;

        var path = url.parse(req.url).pathname;
        if(path.startsWith(route)){
            if(err){
                if(handle.length == 4){
                    handle(err,req,res,next); // 错误处理中间件
                }else{
                    next(err);
                }
            }else{
                handle(req,res,next);
            }
        }else{
            next();
        }
    }

    next()
};



proto.listen = function (port) {
    var server = http.createServer(this);
    server.listen(port)
};

module.exports = createServer;