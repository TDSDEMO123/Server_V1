//var mongoose = require('mongoose');

//var NoteSchema = mongoose.Schema({
  //  title: String,
    //content: String
//}, {
//    timestamps: true
//});

//module.exports = mongoose.model('Note', NoteSchema);

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Note', new Schema({ 
    username: String, 
    password: String, 
    admin: Boolean 
}));
