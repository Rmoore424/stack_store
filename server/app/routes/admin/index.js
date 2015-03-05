'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

router.get('/admin', function (req, res, next) {
	UserModel.findOne({ email: req.query.email }, function (err, user) {
		if (err) next(err);
		console.log('back end', user);
		res.send(user);
	});
});

router.get('/admin/user', function (req, res, next) {
	UserModel.findOne({ email: req.query.email }, function (err, user) {
		if (err) next(err);
		console.log('back end', user);
		res.send(user);
	});
});

router.delete('/admin/deleteUser', function (req, res, next) {
	UserModel.findOneAndRemove( {_id: req.query._id }, function (err, user) {
		if (err) next(err);
		console.log('back end', user);
		res.send(user);
	});
});

router.put('/admin/save', function (req, res, next) {
	console.log("body is", req.body);
	UserModel.findOneAndUpdate( { email: req.body.email }, req.body, function (err, user) {
		if (err) next(err);
		console.log('back end', user );
		res.send(user);
	});
});