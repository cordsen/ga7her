// person.js
var mongoose = require('Mongoose')
	, Schema = mongoose.Schema;


var PersonSchema = new Schema({
    name    : String
  , email     : String
  , phone      : String
  , fbid      : String
});

var Person = mongoose.model('Person', PersonSchema);

var person = new Person({name: 'erik', email: 'cordsen@email.com'});
person.phone = '555 555 1212';
person.save();


var q = Person.find({name:'erik'},function(err,docs){console.log('result:'+docs)});

//module.exports.Person = Person;

