'use strict';
const url = require('url');
const http = require('http');
const proto = {};

function createServer() {
    function app(req, res) {
        app.handle(req, res);
    }

    Object.assign(app, proto);
    app.stack = [];

    return app;
}

proto.use = function (route,fn) {
    let handle = fn;
    let route = route;
    if(typeof route !== 'string'){
        handle = route;
        route = "/";
    }
    this.stack.push({handle:handle,route:route});
};

proto.handle = function (req, res) {
    let stack = this.stack;
    let index = 0;

    function next(err) {
        // stack[index++](req, res, next);
        let layer = stack[index++];
        let route = layer.path;
        let handle = layer.handle;

        let path = url.parse(req.url).pathname;
        if(path.startsWith(route)){
            if(err){
                if(handle.length === 4){
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
    let server = http.createServer(this);
    server.listen(port)
};

module.exports = createServer;