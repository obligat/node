var Tree = require('./Tree');
var t1 = new Tree(123, 1);
var t2 = new Tree(53, 2);
var t3 = new Tree(323, 3);

console.log(t1.getHeight(), t1.getAge());

t1.setHeight(33333);
t2.setAge(00);

console.log(t2.getAge());

console.log(t2.color);
t2.color = 'red';
console.log(t3.color);  // green

Tree.prototype.color = 'blue';
console.log(t2.color);  // red
console.log(t3.color);  // blue