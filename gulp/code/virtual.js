const File = require('vinyl');

var coffeeFile = new File({
    cwd:'/',
    base:'/test/',
    path:'/test/test.js',
    contents:new Buffer('123')
});gulp