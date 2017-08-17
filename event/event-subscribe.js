function Person(name) {
    this.name = name;
    this._events = {};
}

// register eventListener
Person.prototype.on = function (eventName, callback) {
    if (this._events[eventName]) {

        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};

Person.prototype.emit = function (eventName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var callbacks = this._events[eventName];
    callbacks.forEach(function (callback) {
        console.log(callback == this);
        // console.log(this);    global
        callback.apply(this, args);
    })
};

/*Person.prototype.once = function (eventName, callback) {

    function onceCallback() {
        callback.apply(this, arguments);
        // console.log(this); global
        this.removeListener(eventName, onceCallback);
    }

    this.on(eventName, onceCallback);
};*/

var leo = new Person();
leo.on('first', function () {
    console.log('hello first ');
});

leo.on('first', function () {
    console.log('I am first two');
});

leo.emit('first');

leo.once('once1',function (arg) {
    console.log(arg, 'once1');
});

// leo.once('once1',function (arg) {
//     console.log(arg, 'once2');
// });

// leo.emit('once1', 'emit 1');
// leo.emit('once1', 'emit 2');
// leo.emit('once1', 'emit 3');


