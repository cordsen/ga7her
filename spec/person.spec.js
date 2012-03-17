// person.spec.js
// tests for person module
require ('../lib/person.js');

describe("Test Facebook connect", function() {
    it("will log into facebook and get a token", function() {
        var person = new Person();
        expect(person.getFBToken('')).toEqual('something');
    });
});