// var r = require(...) >> use var f1 = new r.f1('me');
// require(...) >> f1 is undefined, not available
var f1 = function (i) {
	this.name = 'f1';
	this.init = i;
	}
exports.f1 = f1;

// var r = require(...) >> use var f2 = new r.f4('me') or r.f4 returns the
// static instance, ie r.f4.name === 'f2'
// require(...) >> f2 is undefined, not available
function f2 (i) {
	this.name = 'f2';
	this.init = i;
}
exports.f4 = f2;

// var r = require(...) >> use var f3 = new r.f3('me');
// require(...) >> f3 is undefined, not available
exports.f3 = function (i) {
	this.name = 'f3';
	this.init = i;
}

// var r = require(...) >> use var f = new f5'me') (not r.f5, f5 is in global)
// require(...) >> f5 is availabel in global namespace
// in either case f5.name is empty, static value is not set until new is called
f5 = function (i) {
	this.name = 'f5';
	this.init = i;
}

// var r = require(...) >> r.v1 is defined as below
// require(...) >> v1 is unavailable
exports.v1 = {name: 'v1'};

// var r = require(...) >> v2 is defined on teh global namespace, r.v2 is undefined;
// require(...) >> v2 is defined as below in the global namespace
v2 = {name: 'v2'};

