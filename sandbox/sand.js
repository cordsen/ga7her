
var mongoose = require('mongoose')
	, User = require ('../lib/user').User
	, Group = require ('../lib/group.js').Group;

var sand = module.exports.sand = function () {
	mongoose.connect('mongodb://localhost:27017/mobvite_test');
	
	this.u1 = new User({name: {first: 'foo1', last: 'bar1'}, email: 'foo1@bar1.com'});
	this.u1.save();
	this.u2 = new User({name: {first: 'foo2', last: 'bar2'}, email: 'foo2@bar2.com'});
	this.u2.save();

	this.g1 = new Group({name: 'party 1 for #get', owner: this.u1._id});
	this.g1.save();		
	this.g2 = new Group({name: 'party 2 for #get', owner: this.u2._id});
	this.g2.save();
}

//exports.sand;
/*
var test = new sand();
console.log(test.u1);
console.log(test.u2);
console.log(test.g1);
console.log(test.g2);
*/
