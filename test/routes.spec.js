var mongoose = require('mongoose');
require("../server/db");
var supertest = require('supertest');
var app = require('../server/app');
var agent = supertest.agent(app);
var spies = require("chai-spies");
var chai = require('chai');
var expect = chai.expect;
var User = mongoose.model('User');
var Category = mongoose.model('Category');

chai.use(spies);

describe('Server', function () {
	var user;
	beforeEach(function (done) {
		User.remove({}).exec(function () {
			user = new User({
				first_name: "Eric",
				last_name: "Gonzalo",
				email: "ersgonzalo@gmail.com"
			});
			user.save(function () {
				done();
			});
		});
	});

	describe('GET /', function () {
		it('should get 200 on index', function (done) {
			agent
				.get('/')
				.expect(200, done);
		});
	});

	describe('GET /admin/user', function () {
		it('should get 200', function (done) {
			agent
				.get('/api/admin/admin/user')
				.expect(200, done);
		});
	});

	describe('PUT /admin/save', function () {
		it('should find a user by email and update that user', function (done) {
			agent
				.put('/api/admin/admin/save')
				.send({first_name: "Alice", last_name: "Kindheart", email: user.email})
				.end(function (err, response) {
					User.findOne({first_name: "Alice"}, function (err, returnedUser) {
						expect(returnedUser).to.exist;
						expect(returnedUser.first_name).to.equal("Alice");
						done();
					});
			});
		});
	});

	describe('GET /categories', function () {
		it('should get 200', function (done) {
			agent.get('/api/category/categories')
				.expect(200, done);
			});
	});

	describe('POST /makeCategories', function () {
		it('should create a new category', function (done) {
			agent
				.post('/api/category/makeCategory')
				.send({name: 'space', description: 'space is awesome'})
				.end(function (err, response) {
				Category.findOne({name: 'space'}, function (err, returnedCategory) {
					expect(returnedCategory).to.exist;
					expect(returnedCategory.description).to.equal('space is awesome');
					done();
				});
			});
		});
	});

	describe('POST /signup', function () {
		it('should create a new user', function (done) {
			agent
				.post('/api/signup/signup')
				.send({first_name: 'Rich', last_name: 'Moore', email: 'rmoore424@gmail.com', password: 'abc123'})
				.end(function (err, response) {
					User.findOne({email: 'rmoore424@gmail.com'}, function (err, returnedUser) {
						expect(returnedUser).to.exist;
						expect(returnedUser.first_name).to.equal('Rich');
						done();
					});
			});
		});
	});
});
