var mongoose = require('mongoose');
var config = require('../Config/mongo.config');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Comment = new Schema({
  title     : String,
  body      : String,
  date      : Date
});

var BlogPost = new Schema({
  author    : ObjectId,
  title     : String,
  body      : String,
  buf       : Buffer,
  date      : Date,
  comments  : [Comment],
  meta      : {
    votes : Number,
    favs  : Number
  }
});

console.log('connecting to ' + config.connectionString);
mongoose.connect(config.connectionString);

exports.Post = mongoose.model('BlogPost', BlogPost);

/*var connection = mongoose.createConnection(config.connectionString);

exports.Post = connection.model('BlogPost', BlogPost);*/
