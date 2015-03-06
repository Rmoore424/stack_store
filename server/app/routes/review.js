'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var ReviewModel = mongoose.model('Review');

router.get('/', function (req, res, next) {
	ReviewModel.find({})
		.exec(function (err, reviews) {
			if (err) next(err);
			res.send(reviews);
		});
});

router.post('/', function (req, res, next) {
    ReviewModel.create(req.body, function(err, review){
    	if(err) next(err);
    	res.send(review);
    });
});

router.delete('/', function (req, res, next){
	ReviewModel.findOneAndRemove({_id: req.query._id}, function(err, review){
		if (err) next (err);
		console.log('Review deleted');
		res.send(review);
	});
});