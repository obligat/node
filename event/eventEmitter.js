var EventEmitter = require('events');
var util = require('util');

function Animal(name) {
    this.name = name;
}

util.inherits(Animal, EventEmitter);

var dog = new Animal('dist');

dog.on('ring', function () {
    console.log('give first on')
});

dog.addListener('ring', function () {
    console.log('give second addListener')
});

// dog.removeAllListeners('ring');

var drop = function (arg) {
    console.log(arg,'drop once')
};

dog.once('drop', drop);

dog.emit('ring');
// dog.removeListener('drop', drop);
dog.emit('drop','perfect 123 : ');
dog.emit('drop');

console.log(dog.listeners('ring'));