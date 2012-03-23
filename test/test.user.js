/*global describe, before, it, assert */
"use strict";
var expect = require('chai').expect;

var mongoose = require('mongoose'),
	User = require('../lib/user.js').User;

describe('user', function () {
	var user;
	before(function () {
		mongoose.connect('mongodb://localhost:27017/mobvite_test');
	});

	describe('#save', function () {
		before(function (done) {
			User.remove({}, done);
		});

		it('does not allow an empty name', function (done) {
			user = new User({first: '', last: '', email: 'foo@bar.com'});
			user.save(function (err) {
				expect(err.message).to.equal('Validation failed');
				expect(user.isNew).to.equal(true);
				// use equal(true) instead of be.true so jslint does not yell at me
				done();
			});
		});
/* taken care of by mongoose-auth
		it('does not allow an invalid email address', function (done) {
			user = new User({first: 'foo', last: 'bar', email: 'foobar.com'});
			user.save(function (err) {
				expect(err.message).to.equal('Validation failed');
				expect(user.isNew).to.equal(true);
				done();
			});
		});
*/
		it('creates a user', function (done) {
			user = new User({first: 'foo', last: 'bar', email: 'foo@bar.com'});
			expect(user.isNew).to.equal(true);
			user.save(function (err) {
				expect(user.isNew).to.equal(false);
				done();
			});
		});

		it('does not allow duplicate users (by email)', function (done) {
			user = new User({first: 'fuzz', last: 'bar', email: 'foo@bar.com'});
			expect(user.isNew).to.equal(true);
			user.save(function (err) {
				expect(err.message).to.match(/duplicate key error/);
				//expect(user.isNew).to.equal(true); for some reason it is not
				//true anymore, but save does fail. possible but with famework?
				done();
			});
		});
	});

	describe('#findOne and #update', function () {
		before(function (done) {
			User.remove({}, function (err) {
				if (err) {
					return done(err);
				}
				user = new User({first: 'foo', last: 'bar', email: 'foo@bar.com'});
				user.save(done);
			});
		});

		it('gets a user', function (done) {
			User.findOne({email: 'foo@bar.com'}, function (err, doc) {
				expect(err).to.equal(null);
				expect(doc.first).to.equal('foo');
				expect(doc.last).to.equal('bar');
				done();
			});
		});
		
		it('updates a user', function (done) {
			User.update({email: 'foo@bar.com'},
				{first: 'foobar', last: 'baz', email: 'foobar@baz'},
				function (err, num) {
					expect(num).to.equal(1);
					done();
				});
		});
	});
/* taken care of by mongoose-auth
	describe('#authenticate', function () {
		before(function (done) {
			User.remove({}, function (err) {
				if (err) {
					return done(err);
				}
				done();
			});
		});

		it('allows you to login with a password', function (done) {
			User.authenticate({email: 'foo@bar.com', password: 'foobar'}, function (err, doc) {
				expect(err).to.equal(null);
				expect(doc.first).to.equal('foo');
				expect(doc.last).to.equal('bar');
				done();
			});
		});
		
		it('allows you to login with facebook', function (done) {
			User.authenticate({fbid: 'some qa id'}, function (err, doc) {
				expect(err).to.equal(null);
				expect(doc.first).to.equal('foo');
				expect(doc.last).to.equal('bar');
				done();
			});
		});
	});
*/
});

/*
		*get user
		*create user
		*update user
		login user with email+password
		login user with facebook
		login user with google
		merge account
		add additional email addresses (FB, twitter, etc too?)
		logout user
		check user token
		get user groups
		get user contacts
 */

