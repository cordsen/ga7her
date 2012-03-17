require ('../lib/person.js');

var person = new Person;
console.log(person.value.name);
person.setName('bob');
console.log(person.value.name);
console.log(person.Name);
console.log(person.Name());
