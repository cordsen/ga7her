/*global describe, before, it, assert */
"use strict";
var expect = require('chai').expect;

var mongoose = require('mongoose'),
	Group = require('../lib/group.js').Group;


describe('Group', function () {
	var group;
	before(function () {
		mongoose.connect('mongodb://localhost:27017/mobvite_test');
	});

	describe('#save', function () {
		before(function (done) {
			Group.remove({}, done);
		});

        it('requires a valid owner', function (done) {
            group = new Group({name: 'foo'});
			group.save(function (err) {
				expect(err.message).to.equal('Invalid ObjectId');
				expect(group.isNew).to.equal(true);
				done();
			});
        });

        it('does not allow an empty name', function (done) {
            group = new Group({name: '', owner: ''});
			group.save(function (err) {
				expect(err.message).to.equal('Validation failed');
				expect(group.isNew).to.equal(true);
				done();
			});
        });
    });
});
/* 
 * user can create group
 * can save to DB
 * can view
 * user can invite friends to group

*/

