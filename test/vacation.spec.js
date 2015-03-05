var mongoose = require('mongoose');
require("../server/db");
var Vacation = mongoose.model('Vacation');
var things = require("chai-things");
var spies = require("chai-spies");
var chai = require('chai');
var expect = chai.expect;
chai.use(things);
chai.use(spies);

describe("Vacation Model", function () {
	beforeEach(function (done) {
		Vacation.remove({}, done);
	});

	describe('Validations', function () {
		var vacation;
		beforeEach(function () {
			vacation = new Vacation();
		});

		it('should err without a name', function (done) {
			vacation.validate(function (err) {
				expect(err.errors).to.have.property('name');
				done();
			});
		});

		it('should err with name of zero length', function (done) {
			vacation.name = '';
			vacation.validate(function (err) {
				expect(err.errors).to.have.property('name');
				done();
			});
		});

		it('should err without a description', function (done) {
			vacation.validate(function (err) {
				expect(err.errors).to.have.property('description');
				done();
			});
		});

		it('should err without a price', function (done) {
			vacation.validate(function (err) {
				expect(err.errors).to.have.property('price');
				done();
			});
		});

		it('should err without a category', function (done) {
			vacation.validate(function (err) {
				expect(err.errors).to.have.property('category');
				done();
			});
		});
	});
});