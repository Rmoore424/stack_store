'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

//find one user
router.get('/:email', function (req, res, next) {
	UserModel.findOne({ email: req.params.email }, function (err, user) {
		if (err) next(err);
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
router.delete('/:id', function (req, res, next) {
	UserModel.findOneAndRemove( {_id: req.params.id }, function (err, user) {
		if (err) next(err);
		res.send(user);
	});
});

//update one user, used to be save
router.put('/', function (req, res, next) {
	var password = req.body.password;
	req.body.password = "";
	UserModel.findOneAndUpdate( { email: req.body.email }, req.body, function (err, user) {
		if (err) next(err);
		user.password = password;
		user.save(function (err, user) {
			res.send(user);
		});
	});
});

//create a new user, used to be in signup
//Ensure index in order for uniqueness to work
router.post('/', function (req, res, next) {
	UserModel.create(req.body, function (err, user) {
		if (err) {
			if (err.code === 11000 || err.code === 11001) {
				res.send({error:"User already exists"});
			}
			else next(err);
		}
		else {
			res.send({user: user});
		}	
	});
});