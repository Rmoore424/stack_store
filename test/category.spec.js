var mongoose = require('mongoose');
require("../server/db");
var Category = mongoose.model('Category');
var things = require("chai-things");
var spies = require("chai-spies");
var chai = require('chai');
var expect = chai.expect;
chai.use(things);
chai.use(spies);

describe("Category Model", function () {
	beforeEach(function (done) {
		Category.remove({}, done);
	});

	describe('Validations', function () {
		var category;
		beforeEach(function () {
			category = new Category();
		});

		it('should err without a name', function (done) {
			category.validate(function (err) {
				expect(err.errors).to.have.property('name');
				done();
			});
		});

	});
});