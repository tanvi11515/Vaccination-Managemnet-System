var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var Vaccine = new Schema({
	cname: String,
	duration: String,
	start: String,
	Lecturer: String,
	seats: Number
});

// Compile model from schema
var Vaccine = mongoose.model('Vaccine', Vaccine );
module.exports = {
  Vaccine: Vaccine
}