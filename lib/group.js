// group.js
/*global ObjectId*/
"use strict";
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var notEmptyString = {type: String, required: true, validate: function (s) {return s.length >= 1; }};

var GroupSchema = new Schema({
	name        : notEmptyString,
	type        : {type     : String, enum : ['event', 'room']},
	description : String,
	owner       : Schema.ObjectId,
	privacy     : {type     : String, enum : ['public', 'private']},
	meta        : {
		date    : Date,
		place   : String
	}
});


var Group = mongoose.model('Group', GroupSchema);


module.exports.Group = Group;

