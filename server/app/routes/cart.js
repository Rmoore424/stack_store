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

router.delete('/:id', function (req, res, next) {
	CartModel.findOneAndRemove( {_id: req.params.id }, function (err, cart) {
		if (err) next(err);
		res.send(cart);
	});
});

//this route may be unneccessary now --RICH
router.put('/', function (req, res, next) {
	var product = req.body.product;
	var idx = req.body.idx;
	  CartModel.findOne({_id: req.body.cartId})
	  	.exec(function (err, cart) {
	  		if (err) next(err);
	  		cart.items.set(idx, product);
	  		cart.save(function (err, savedCart) {
	  			res.status(200).end();
	  		});
	  	});
});
	// 		cart.update({items: {$in: [product.item] } }, 
	// 					{$set: {quantity: product.quantity}},
	// 					function (err, cart) {
	// 						if (err) next(err);
	// 						console.log("returned cart", cart);
	// 						res.status(200).end();
	// 					});
	 	// {$set: {items: {$elemMatch: {item: product._id}}}})
	// 	});

router.put('/user', function (req, res, next) {
	CartModel.findOneAndUpdate( { _id: req.body.cartId }, {$set: {user: req.body.userId} }, function (err, cart) {
		if (err) next(err);
		res.send(cart);
	});
});

router.put('/remove', function (req, res, next) {
	CartModel.findOneAndUpdate( { _id: req.body.cartId }, {$pull: {items: { _id: req.body.productId }}}, function (err, cart) {
		if (err) next(err);
		res.status(200).end();
	});
});

router.put('/add', function (req, res, next) {
	CartModel.findOneAndUpdate( {_id: req.body.cartId }, {$push: {items: req.body.product }}, function (err, cart) {
		if (err) next(err);
		res.status(200).end();
	})
})

router.put('/clear', function (req, res, next) {
	CartModel.findOneAndUpdate( {_id: req.body.cartId}, {$set: { items: []}}, function (err, cart) {
		if (err) next(err);
		console.log("empty cart", cart);
		res.status(200).end();
	})
})

router.get('/:id/items', function (req, res, next) {
	CartModel.findById(req.params.id)
		.populate('items.item')
		.exec(function (err, cart) {
			if (err) next(err);
			res.send(cart.items);
		});
});
