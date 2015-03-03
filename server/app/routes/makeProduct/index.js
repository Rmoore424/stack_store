'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var productModel = mongoose.model('Product');
module.exports = router;

router.post('/makeProduct', function (req, res, next) {
    productModel.create(req.body, function(err, product){
    	if(err) next(err);
    	res.send(product);
    });
	// console.log(req.body);
});