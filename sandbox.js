"use strict";
var express = require('express'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = require('./lib/user.js').User;
mongoose.connect('mongodb://localhost:27017/mobvite_test');

User.remove({}, function (err) {});

var user = new User({first: 'foo', last: 'bar', email: 'foo@bar.com'});
console.log(user.isNew);
user.save(function (err) {
	if (err) {
		console.log('something wrong ' + err);
	}
	console.log('done');
});
console.log(user.isNew);

User.findOne({email: 'foo@bar.com'}, function (err, doc) {
	doc.first = 'foobar';
	doc.last = 'baz';
	doc.email = 'foobar@baz.com';
	doc.save(function (err) {
		if (err) {
			console.log('save failed: ' + err);
		}
	});
});

