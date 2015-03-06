'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

//find one user
router.get('/', function (req, res, next) {
	UserModel.findOne({ email: req.query.email }, function (err, user) {
		if (err) next(err);
		console.log('back end', user);
		res.send(user);
	});
});

// router.get('/user', function (req, res, next) {
// 	UserModel.findOne({ email: req.query.email }, function (err, user) {
// 		if (err) next(err);
// 		console.log('back end', user);
// 		res.send(user);
// 	});
// });
//delete one user, used to be deleteUser
router.delete('/', function (req, res, next) {
	UserModel.findOneAndRemove( {_id: req.query._id }, function (err, user) {
		if (err) next(err);
		console.log('back end', user);
		res.send(user);
	});
});

//update one user, used to be save
router.put('/', function (req, res, next) {
	console.log("body is", req.body);
	UserModel.findOneAndUpdate( { email: req.body.email }, req.body, function (err, user) {
		if (err) next(err);
		console.log('back end', user );
		res.send(user);
	});
});

//create a new user, used to be in signup
router.post('/', function (req, res, next) {
	UserModel.create(req.body, function (err, user) {
		if (err) next(err);
		res.send(user);
	});
});