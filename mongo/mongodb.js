'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/minion');

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('database connect fail' + err);
});

db.once('open', () => {
    console.log('connect !');
});

const mySchema =mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    time: {type: Date, default: Date.now}
});

mySchema.methods.speak = function () {

    console.log('I am ' + this.name);
};

const MyModel = mongoose.model("Minion", mySchema);


let entity = new MyModel({
    name: 'pep',
    age: 1
});


entity.speak();


/*entity.save((err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);  // save into doc
    }
});*/

/*MyModel.find({}, (err, docs) => {
    console.log(docs);

});*/

/*MyModel.create({name: 'da', age: 9},(err,doc)=>{
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
});*/
