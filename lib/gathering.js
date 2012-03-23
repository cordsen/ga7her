// Gathering.js
var mongoose = require('mongoose')
	, Schema = mongoose.Schema;


var GatheringSchema = new Schema({
    name  : String,
	date  : Date,
	place : String,
	email : String
// owner (id)
// description
});

var Gathering = mongoose.model('Gathering', GatheringSchema);

module.exports.Gathering = Gathering;

