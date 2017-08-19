'use strict';
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/minion');

db.connection.on('error', function (err) {
    console.log('database connect fail' + err);
});

db.connection.on('open', () => {
    console.log('connect !');
});

/*
const MyShema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    time: {type: Date, default: Date.now}
});

const MyModel = db.model("Minion", MyShema);

let entity = new MyModel({
    name: 'pep',
    age: 1
});

console.log(entity.name);
console.log(entity.time);

entity.save((err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);  // save into doc
    }
});

MyModel.find({}, (err, docs) => {
    console.log(docs);

});

MyModel.create({name: 'da', age: 9},(err,doc)=>{
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
});*/
