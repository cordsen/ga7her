// group.js
var mongoose = require('Mongoose')
	, Schema = mongoose.Schema;


var GroupSchema = new Schema({
    name    	: String
	, date			: Date
	, place			: String
  , owner     : String //email
// private
// owner (id)
// description
});


var Group = mongoose.model('Group', GroupSchema);


module.exports.Group = Group;

