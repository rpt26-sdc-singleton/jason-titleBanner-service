var assert = require('chai').assert;
var expect = require('chai').expect
var { exampleDataGenerator } = require('../example.data');


(function() {
  describe('Seeding Tests', function() {

    describe('returns a string', function() {

      it('Seeding generator should generate title strings', function() {
        var titleArray = exampleDataGenerator(5);
        expect(typeof titleArray[0].titleName[0]).to.equal('string');
      });
    });

    describe('returns an array of title names', function() {
      it('Seeding generator return array of length inputted by user', function() {
        var titleArray = exampleDataGenerator(5);
        expect(titleArray[0].titleName.length).to.equal(5);
      })
    })
  });
}());
