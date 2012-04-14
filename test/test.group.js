/*global describe, before, it, assert */
"use strict";
var expect = require('chai').expect;

var mongoose = require('mongoose')
	, Group = require('../lib/group').Group
	, User = require('../lib/user').User
	, Step = require('step');


describe('Group', function () {
	var group, user;
	before(function (done) {
		mongoose.connect('mongodb://localhost:27017/mobvite_test');
		Step(
			function clearData () {
				Group.remove({}, this.parallel());
				User.remove({}, this.parallel());
			},
			function createUser () {
				user = new User({name: {first: 'foo', last: 'bar'}, email: 'foo@bar.com'});
				user.save(done);
			}
		);
	});

	describe('#new', function () {
		it('allows you to create a group', function (done) {
			group = new Group({name: 'party time', owner: user._id});
			group.save(function (err) {
				expect(err).to.not.exist;
				expect(group.isNew).to.be.false;
				done();
			});
        });
        
		it('requires a valid owner', function (done) {
            group = new Group({name: 'foo', owner: ''});
			group.save(function (err) {
				expect(err.message).to.equal('Invalid ObjectId');
				expect(group.isNew).to.be.true;
				done();
			});
        });

        it('does not allow an empty name', function (done) {
			group = new Group({name: '', owner: user._id});
			group.save(function (err) {
				expect(err.message).to.equal('Validation failed');
				expect(group.isNew).to.be.true;
				done();
			});
        });
    });

	describe('#get', function () {
		var group1, group2, group3, user2;
		before (function (done) {
			Step(
				function clearData () {
					Group.remove({}, this);
				},
				function createTestUer () {
					user2 = new User({name: {first: 'foo2', last: 'bar2'}, email: 'foo2@bar2.com'});
					user2.save(this);
				},
				function createTestGroups () {
					group1 = new Group({name: 'party 1 for #get', owner: user._id});
					group1.save(function (err) {
					});
					
					group2 = new Group({name: 'party 2 for #get', owner: user._id});
					group2.save(function (err) {
					});
					
					group3 = new Group({name: 'party 3 for #get', owner: user2._id});
					group3.save(function (err) {
						done();
					});
				});
		});
		
		it('returns a single group when searching by id', function (done) {
			Group.findOne({_id: group1._id}, function (err, doc) {
				expect(err).to.not.exist;
				expect(doc.name).to.equal('party 1 for #get');
				done();
			});
		});
		
		it('returns two groups when searching by owner', function (done) {
			Group.find({owner: user._id}, function (err, docs) {
				expect(err).to.not.exist;
				expect(docs.length).to.equal(2);
				done();
			});
		});
		
		it('returns three groups when searching by regex', function (done) {
			Group.find({name: /party \d for/}, function (err, docs) {
				expect(err).to.not.exist;
				expect(docs.length).to.equal(3);
				done();
			});
		});
	});

	describe('#addUsers', function () {
		var user2, user3;
		before(function (done) {
			Step(
				function clearData () {
					Group.remove({}, this);
				},
				function createTestUer () {
					user2 = new User({name: {first: 'foo2', last: 'bar2'}, email: 'foo2@bar2.com'});
					user2.save(this);
					user3 = new User({name: {first: 'foo3', last: 'bar3'}, email: 'foo3@bar3.com'});
					user3.save(this);
				},
				function createTestGroups () {
					group = new Group({name: 'party 1 for #addUsers', owner: user._id});
					group.save(function (err) {
						done();
					});
				});
			
		});
	
		it('should allow you to add an admin member', function (done) {
			group.addMember(user2, "admin", function (err, members) {
				expect(err).to.not.exist;
				expect(members).to.eql(group.members);
				expect(members[1].role).to.equal("admin");
				group.save(done);
			});
		});
	
		it('should allow you to add a guest member', function (done) {
			group.addMember(user3, function (err, members) {
				expect(err).to.not.exist;
				expect(members).to.eql(group.members);
				expect(members[2].role).to.equal("guest");
				group.save(done);
			});
		});
		
		it('should not allow you to add an invalid user', function (done) {
			group.addMember({_id:''}, function (err, members) {
				expect(err.message).to.equal('not a valid user object');
				done();
			});
		});
		
		it('should allow you to remove a members', function (done) {
			group.removeMember(user2, function (err, members) {
				expect(err).to.not.exist;
				expect(members).to.eql(group.members);
				group.save(done);
			});
		});
		
		it('should not allow you to remove the owner', function (done) {
			group.removeMember(user, function (err, members) {
				expect(err.message).to.equal('cannot remove owner');
				done();
			});
		});
	});
});
/* 
 * %% user can create group
 * %% can save to DB
 * %% can view
 * user can invite friends to group
 *
 * %% CRUD Create Read(Get) Update
 * addmember - with status, role
 * %% removemember
 * updateUser (change role or status)

*/

