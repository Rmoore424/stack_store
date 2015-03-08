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

router.get('/:userId', function (req, res, next) {
	CartModel.findOne({ user: req.params.userId})
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
	CartModel.findOneAndUpdate( {_id: req.body._id}, req.body, function (err, cart) {
		if (err) next(err);
		res.send(cart);
	});
});

router.put('/user', function (req, res, next) {
	CartModel.findOneAndUpdate( { _id: req.body.cartId }, {$set: {user: req.body.userId} }, function (err, cart) {
		if (err) next(err);
		res.send(cart);
	});
});

router.get('/:id/items', function (req, res, next) {
	CartModel.findById(req.params.id)
		.populate('items.item')
		.exec(function (err, cart) {
			res.send(cart.items);
		});
});
