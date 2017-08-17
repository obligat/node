var fs = require('fs');
var EventEmitter = require('events');

var event = new EventEmitter();

var person = {};

event.on('name', output);
event.on('age', output);

fs.readFile('name.txt', 'utf8', function (err, data) {
    person.name = data;
    event.emit('name');
});

fs.readFile('age.txt', 'utf8', function (err, data) {
    person.age = data;
    event.emit('age');
});

function output() {
    if (person.name && person.age) {

        console.log(person.name, person.age);
    }


}

/*
var person = {};
var count = 0;

fs.readFile('name.txt', 'utf8', function (err, data) {
    person.name = data;
    if (++count == 2) {
        output();
    }
});

fs.readFile('age.txt', 'utf8', function (err, data) {
    person.age = data;
    if (++count == 2) {
        output();
    }
});

function output() {
    console.log(person.name, person.age);
}*/
