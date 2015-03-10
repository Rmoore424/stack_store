'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var VacationModel = mongoose.model('Vacation');
var CategoryModel = mongoose.model('Category');

//this route gets all vacations
router.get('/', function (req, res, next) {
	VacationModel.find({})
		.exec(function (err, vacations) {
			if (err) next(err);
			res.send(vacations);
		});
});

//this route gets one vaction by name
router.get('/:name', function (req, res, next) {
	VacationModel.findOne({ name: req.params.name })
		.exec(function (err, vacation) {
			if (err) next(err);
			res.send(vacation);
		});
});

//this route looks for one vacation using the vacation name
router.get('/search/:name', function (req, res, next) {
	console.log(req.params);
	VacationModel.findOne({ name: req.params.name })
		.exec(function (err, vacation) {
			if (err) next(err);
			console.log(req.params.name);
			res.send(vacation);
		})
});

//this routes gets all vacations and filters by category
router.get('/category/:id', function (req, res, next) {
	VacationModel.find({})
	.exec(function (err, vacations) {
		vacations = vacations.filter(function (el) {
			return el.category.indexOf(req.params.id) > -1;
		});
		res.send(vacations);
	});
});

//this route creates a vacation, used by admin
router.post('/', function (req, res, next) {	
    VacationModel.create(req.body, function(err, vacation){
    	if(err) next(err);
    	res.send(vacation);
    });
});

router.put('/', function (req, res, next) {
	VacationModel.findOneAndUpdate({_id: req.body._id}, req.body)
		.exec(function (err, vacation) {
			console.log(vacation);
			if (err) next(err);
			res.send(vacation);
		});
});

router.delete('/:id', function (req, res, next) {
	VacationModel.findOneAndRemove({_id: req.params.id})
		.exec(function (err, vacation) {
			if (err) next(err);
			res.send(vacation);
		});
});