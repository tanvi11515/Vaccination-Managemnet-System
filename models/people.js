var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var Peoples = new Schema({
	name: String,
    email: String,
    age: String,
    address: String,
    password: String,
    cpassword: String
});

// Compile model from schema
var Peoples = mongoose.model('Peoples', Peoples );
module.exports = {
  Peoples: Peoples
}