// group.js
/*global ObjectId*/
"use strict";
var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, myTypes = require('./my-types')
	, DEFAULT_ROLE = "guest";

var Member = new Schema({
	userId   : {type : Schema.ObjectId, ref: 'User'}
	, role   : {type : String, enum : ['admin', 'guest']}
})

// used as a callback to a filter function
var filterMembersByUserId = function (obj, index, array) { 
	return obj.userId === this._id;
}

var GroupSchema = new Schema({
	name          : myTypes.notEmptyString
	, type        : {type : String, enum : ['event', 'room']}
	, description : String
	, owner       : {type : Schema.ObjectId, ref: 'User'}
	, privacy     : {type : String, enum : ['public', 'private']}
	, meta        : {
		date      : Date
		, place   : String
	  }
	, _members     : [Member] 
	, members  : []
});

GroupSchema.path('members').get(function () {
	var m = this._members.slice(); 
	m.unshift({userId: this.owner, role: "owner"}); 
	return m
});

GroupSchema.methods.addMember = function addMember(user, role, callback) {
	if (typeof role === "function") {
		callback = role;
		role = DEFAULT_ROLE;
	}
	// check public members which includes the owner before adding
	var typeOk = false;
	try {
		typeOk = (user.constructor.modelName === 'User' && user._id !== 'undefined');
	}
	catch (e)
	{
		return callback(e);
	}
	if (!typeOk) {
		return callback(new TypeError('not a valid user object'));
	}
	if (this.members.filter(filterMembersByUserId, user).length === 0) {
		this._members.push({userId: user._id, role: role});
	}
	return callback(null, this.members);
}

GroupSchema.methods.removeMember = function removeMember(user, callback) {
	if (user._id === this.owner) {
		return callback(new Error('cannot remove owner'));
	}
	var member = this._members.filter(filterMembersByUserId, user);
	if (member.length !== 0) {
		this._members.id(member[0].id).remove();
	}
	return callback(null, this.members);
}

var Group = mongoose.model('Group', GroupSchema);

module.exports.Group = Group;

