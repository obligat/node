const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function (session) {
    let Store = session.Store;

    function FileStore(opts) {
        let options = opts || {};
        this._maxAge = options.maxAge || 0;
        this._dir = options.dir || '.';
        this._percent = 0.1;  // 每访问 10 次，触发一次垃圾收集
        mkdirp.sync(this._dir);
    }

    // var data = {};

    FileStore.prototype.__proto__ = Store.prototype;

    FileStore.prototype.get = function (sid, cb) {

        fs.exists(path.join(this._dir, sid), function (exists) {
            if (exists) {
                fs.readFile(path.join(this._dir, sid), {encoding: 'utf8'}, function (err, data) {
                    cb(null, JSON.parse(data));
                })
            } else {
                cb(null, null);
            }
        });

        if ((Math.random() * 10).toFixed(0) === 1) {

            this.startGC();
        }

        /*fs.readFile(path.join(this._dir, sid), {encode: 'utf8'}, function (err, data) {
            cb(null, JSON.parse(data));
        });*/
        /* console.log('file store get', data[sid]);
         cb(null, data[sid]);*/
    };


    FileStore.prototype.startGC = function () {

        fs.readdir(this._dir,function (err, list) {
            list.forEach(function (file) {
                fs.stat(path.join(this._dir,file),function (err, stat) {
                   if( stat.mtime + this._maxAge < Date.now()){
                       fs.unlink(path.join(this._dir,file));
                   }
                })
            })
        })
    };

    FileStore.prototype.set = function (sid, session, cb) {
        fs.writeFile(path.join(this._dir, sid), JSON.stringify(session), cb);
        /*data[sid] = session;
        console.log('file store get', data[sid]);
        cb();*/
    };
    FileStore.prototype.destroy = function (sid, cb) {

        fs.unlink(path.join(this._dir, sid), cb);

        /* delete data[sid];
         cb();*/
    };

    return FileStore;
};