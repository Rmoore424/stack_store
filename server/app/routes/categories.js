'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var CategoryModel = mongoose.model('Category');

router.get('/', function (req, res, next) {
	CategoryModel.find({})
		.exec(function (err, categories) {
			if (err) next(err);
			res.send(categories);
		});
});

router.get('/:name', function (req, res, next) {
	CategoryModel.findOne({name: req.params.name})
		.exec(function (err, category) {
			if (err) next(err);
			res.send(category);
		});
});

router.post('/', function (req, res, next) {
    CategoryModel.create(req.body, function(err, category){
    	if(err) next(err);
    	res.send(category);
    });
});

//when a category is deleted, all Vacations with that 
//category need to have it's reference deleted too -RICH
router.delete('/:id', function (req, res, next) {
	CategoryModel.findOneAndRemove({_id: req.params.id})
		.exec(function (err, category) {
			if (err) next(err);
			res.send(category);
		});
});

router.put('/', function (req, res, next) {
	CategoryModel.findOneAndUpdate({_id: req.body._id}, req.body)
		.exec(function (err, category) {
			if (err) next(err);
			res.send(category);
		});
});