var mongoose = require('mongoose');
require("../server/db");
var Review = mongoose.model('Review');
var things = require("chai-things");
var spies = require("chai-spies");
var chai = require('chai');
var expect = chai.expect;
chai.use(things);
chai.use(spies);

describe("Review Model", function () {
	beforeEach(function (done) {
		Review.remove({}, done);
	});

	describe('Validations', function () {
		var review;
		beforeEach(function () {
			review = new Review();
		});

		it('should err without a rating', function (done) {
			review.validate(function (err) {
				expect(err.errors).to.have.property('rating');
				done();
			});
		});

		it('should err with a rating less than 1', function (done) {
			var ratingTooLow = new Review({rating: 0, text: 'rating is too low'});
			ratingTooLow.validate(function (err) {
				expect(err.errors).to.have.property('rating');
				done();
			});
		});

		it('should err with a rating higher than 5', function (done) {
			var ratingTooHigh = new Review({rating: 6, text: 'rating is too high'});
			ratingTooHigh.validate(function (err) {
				expect(err.errors).to.have.property('rating');
				done();
			});
		});


		it('should err without text', function (done) {
			review.validate(function (err) {
				expect(err.errors).to.have.property('text');
				done();
			});
		});

		it('should have a default Date', function (done) {
			review.validate(function (err) {
				expect(review.date).not.to.be.null;
				expect(review.date).to.be.an.instanceof(Date);
				done();
			})
		})
	});
});