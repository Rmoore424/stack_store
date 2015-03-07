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