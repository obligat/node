var person = require('./person');
console.log(require.cache);
delete require.cache[require.resolve('./person')];
var person = require('./person');  // once exe

person.getName();

// (function (exports, require, module, __filename, __dirname)
// { var person = require('person');

