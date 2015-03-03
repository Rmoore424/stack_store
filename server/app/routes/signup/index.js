'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

router.post('/signup', function (req, res, next) {
	UserModel.create(req.body, function (err, user) {
		if (err) next(err);
		res.send(user);
	});
});