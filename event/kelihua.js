function say(name, word) {
    console.log(name, " : ", word)
}

say('loe', '2323');
say('loe', '23ff23');
say('loe', '23ee23');
say('loe', '23we23');

var newSay = say.bind(this, 'loe');
newSay("1212");
newSay("121ew2");
newSay("1212323");

function nnSay() {
    say.apply(null, ['loe'].concat(Array.prototype.slice.call(arguments)));
}

nnSay(3);
nnSay(332);
nnSay(3323);

function eat(times, callback) {
    var n = times;
    return function() {
        n--;
        if(n==0){
            callback();
        }
    };
}

var eee = eat(5, function () {
    console.log('yes ');
});

eee();
eee();
eee();
eee();
eee();
