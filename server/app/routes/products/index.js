'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var ProductModel = mongoose.model('Product');

router.get('/products', function (req, res, next) {
	ProductModel.find({})
		.exec(function (err, products) {
			if (err) next(err);
			res.send(products);
		});
});