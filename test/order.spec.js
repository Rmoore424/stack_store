var mongoose = require('mongoose');
require("../server/db");
var Order = mongoose.model('Order');
var things = require("chai-things");
var spies = require("chai-spies");
var chai = require('chai');
var expect = chai.expect;
chai.use(things);
chai.use(spies);

describe("Order Model", function () {
	beforeEach(function (done) {
		Order.remove({}, done);
	});

	describe('Validations', function () {
		var user, order;
		beforeEach(function () {
			order = new Order();
		});

		it('should err without an order number', function (done) {
			order.validate(function (err) {
				expect(err.errors).to.have.property('order_number');
				done();
			});
		});

		it('should err without a user', function (done) {
			order.validate(function (err) {
				expect(err.errors).to.have.property('user');
				done();
			});
		});

		it('should err without a list of products', function (done) {
			order.validate(function (err) {
				expect(err.errors).to.have.property('products');
				done();
			});
		});

		it('should err without a total amount', function (done) {
			order.validate(function (err) {
				expect(err.errors).to.have.property('total_charge');
				done();
			});
		});

		it('should have a default status of "Created"', function (done) {
			expect(order.status).to.equal('Created');
			done();
		});

		it('should have a default Date', function (done) {
			expect(order.date).not.to.be.null;
			expect(order.date).to.be.an.instanceof(Date);
			done();
		})
	});

});