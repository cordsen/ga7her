// Gathering.js
var mongoose = require('Mongoose')
	, Schema = mongoose.Schema;


var GatheringSchema = new Schema({
    name    	: String
	, date			: Date
	, place			: String
  , email     : String
// private
// owner (id)
// description
});


var Gathering = mongoose.model('Gathering', GatheringSchema);



module.exports.Gathering = Gathering;

