require('should');

var group = require('../lib/group.js').Group;

describe('group', function() {

		// synch
    describe('#init', function () {
        var g;
        before(function () {
            g = new group({name:'foo', place: 'bar'});
        });

        it('should have the name foo', function () {
            g.name.should.equal('foo')
        });

        it('name should have the place bar', function () {
            g.place.should.equal('bar')
        });
/*        it('should have name', function () {
            model.db.name.should.equal('sleek-test');
        });
*/    });
/*
		// asynch
    describe('thread collection', function() {
        var col;

        before(function () {
            col = model.threadCol;
        });

        it('should be ok', function () {
            col.should.be.ok;
        });

        describe('indexList', function () {
            var indexList;

            before(function (done) {
                col.indexes(function (err, value) {
                    indexList = value;
                    done(err);
                })
            })

            it('should be array', function () {
                indexList.should.be.an.instanceof(Array);
                indexList.should.be.length(3);
            });
        });
    });

*/
});