var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/my_database');

var Schema = mongoose.Schema
var User = new Schema({
    author    : String
  , type      : String
});

var MyUserModel = mongoose.model('User', User); //create and access the model User

var u = new MyUserModel();
u.author = 'authorname';
u.save(function(err){
    if (err) console.log(err);
});

MyUserModel.find({}, function (err,docs) {
    console.log(docs);
});
