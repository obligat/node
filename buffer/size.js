var buf1 = new Buffer(2);
buf1[0]=0x32;
buf1[1]=0x32;
console.log(buf1);

var buf2 = new Buffer([0x32, 0x32]);
var buf3 = new Buffer("22");

console.log(buf1.toString() == buf2.toString());
console.log(buf2.toString() == buf3.toString());
console.log(buf2.toString());

/*
* <Buffer 32 32>
true
true
22
* */