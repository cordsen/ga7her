// user.js
var mongoose = require('/usr/local/lib/node_modules/mongoose')
	, Schema = mongoose.Schema;


var UserSchema = new Schema({
    name    	: String
// private
// owner (id)
// description
});


var User = mongoose.model('User', UserSchema);


module.exports.User = User;

