'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var CartModel = mongoose.model('Cart');

router.get('/', function (req, res, next) {
	CartModel.findOne({ id: req.query.id })
		.exec(function (err, cart) {
			if (err) next(err);
			res.send(cart);
		});
});

router.post('/', function (req, res, next) {
    CartModel.create(req.body, function(err, cart){
    	if(err) next(err);
    	res.send(cart);
    });
});

router.delete('/', function (req, res, next) {
	CartModel.findOneAndRemove( {_id: req.query._id }, function (err, cart) {
		if (err) next(err);
		res.send(cart);
	});
});


router.put('/', function (req, res, next) {
	CartModel.findOneAndUpdate( { _id: req.body._id }, req.body, function (err, cart) {
		if (err) next(err);
		res.send(cart);
	});
});