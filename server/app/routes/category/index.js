'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var CategoryModel = mongoose.model('Category');

router.get('/categories', function (req, res, next) {
	CategoryModel.find({})
		.exec(function (err, categories) {
			if (err) next(err);
			res.send(categories);
		});
});

router.post('/makeCategory', function (req, res, next) {
    CategoryModel.create(req.body, function(err, category){
    	if(err) next(err);
    	res.send(category);
    });
});