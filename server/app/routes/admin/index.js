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