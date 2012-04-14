// user.js
"use strict";
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	myTypes = require('./my-types'),
	mongooseAuth = require('mongoose-auth');

//var notEmptyString = {type: String, required: true, validate: function (s) {return s.length >= 1; }};

var UserSchema = new Schema({}),
//	first : String,//myTypes.notEmptyString,
//	last	: String//myTypes.notEmptyString
//}),
	User;


UserSchema.plugin(mongooseAuth, {
	// Here, we attach your User model to every module
	everymodule: {
		everyauth: {
			User: function () {
				return User;
			}
		}
	},
	password: {
		loginWith: 'email' // Or loginWith: 'phone'
		, extraParams: {
				phone: String
			, name: {
					first: myTypes.notEmptyString 
				, last: myTypes.notEmptyString
			}
		}
		, everyauth: {
				getLoginPath: '/login'
			, postLoginPath: '/login'
			, loginView: 'login.jade'
			, getRegisterPath: '/register'
			, postRegisterPath: '/register'
			, registerView: 'register.jade'
			, loginSuccessRedirect: '/'
			, registerSuccessRedirect: '/'
		}
	}
	, facebook: {
			everyauth: {
					myHostname: 'http://mobvite.com:3000'
				, appId: 358925717465400
				, appSecret: 'e568e17a644af01255c42c06aab4bcc5'
				, redirectPath: '/user'
			}
		}
 });

var User = mongoose.model('User', UserSchema);

module.exports.User = User;

