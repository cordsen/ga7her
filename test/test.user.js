// can create user
require('/usr/local/lib/node_modules/should');

var user = require('../lib/user.js').User;

describe('user', function() {

		// synch
    describe('#constructor', function () {
        var u = new user({name:'foo'});

        it('should have the name foo', function () {
            u.name.should.equal('foo')
        });

    });
});

// can save user to DB
// can get user - can view

// user can login with FB

// user can login with google

// account is merged on second login (test both ways)

// user can see friend list

// user can send friend message

// user can create group
  // can reate group
  // can save to DV
  // can view
  
// user can invite friends to group