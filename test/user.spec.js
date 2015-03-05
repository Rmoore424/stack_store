var mongoose = require('mongoose');
require("../server/db");
var User = mongoose.model('User');
var things = require("chai-things");
var spies = require("chai-spies");
var chai = require('chai');
var expect = chai.expect;
chai.use(things);
chai.use(spies);

describe("User Model", function () {
	beforeEach(function (done) {
		User.remove({}, done);
	});

	describe('Validations', function () {
		var user;
		beforeEach(function () {
			user = new User();
		});

		it('should err without an email', function (done) {
			user.validate(function (err) {
				expect(err.errors).to.have.property('email');
				done();
			});
		});

		it('should err without a first name or a last name', function (done) {
			user.validate(function (err) {
				expect(err.errors).to.have.property('first_name');
				expect(err.errors).to.have.property('last_name');
				done();
			});
		});

		it('should have a default admin value of false', function (done) {
			user.validate(function (err) {
				expect(user.admin).to.be.false;
				done();
			});
		});

		it('should err if a user is created with the same email', function (done) {
			var firstUser = new User({first_name: 'Heather', last_name: 'Pike', email: 'heatherlaurenpike@gmail.com'});
			firstUser.save(function (err) {
				var anotherUser = new User({first_name: 'Alice', last_name: 'Kindheart', email: 'heatherlaurenpike@gmail.com'});
				anotherUser.save(function (err) {
					expect(err).to.have.property('err');
					expect(err.err).to.contain('dup key');
					expect(err.err).to.contain('heatherlaurenpike@gmail.com');
					expect(err.err).not.to.contain('Alice');
					expect(err.err).not.to.contain('Kindheart');
					done();
				})
			})
		});
	});

	describe('Methods', function () {

		describe('correctPassword', function () {
			var newUser;
			beforeEach(function (done) {
				User.create({
					first_name: "Rich",
					last_name: "Moore",
					password: 'fullstack',
					email: "rmoore424@gmail.com"
				}, function (err, user) {
					newUser = user;
					done();
				});
			});

			it('should return true if the candidatePassword gets hashed to the stored password', function (done) {
				var comparePassword = newUser.correctPassword('fullstack');
				expect(comparePassword).to.be.true;
				done();
			});
		});
	});

	describe('Hooks', function () {

			it('should call generateSalt before user gets saved', function (done) {
				var newUser = new User({
					first_name: "Rich",
					last_name: "Moore",
					password: 'fullstack',
					email: "rmoore424@gmail.com"
				});
				newUser.generateSalt = chai.spy(newUser.generateSalt);
				newUser.save(function() {
					expect(newUser.generateSalt).to.have.been.called();
					done();
				})
			});

			it('should call encryptPassword before use gets saved', function (done) {
				var newUser = new User({
					first_name: "Heather",
					last_name: "Pike",
					password: 'fullstack',
					email: "heatherlaurenpike@gmail.com"
				});
				newUser.encryptPassword = chai.spy(newUser.encryptPassword);
				newUser.save(function() {
					expect(newUser.encryptPassword).to.have.been.called();
					done();
				})
			});
	});
});