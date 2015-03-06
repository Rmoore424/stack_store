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
			console.log("vacations:", vacations);
			if (err) next(err);
			res.send(vacations);
		});
});

//this route gets one vaction by id, look at req.params
router.get('/:id', function (req, res, next) {
	console.log(req.query);
	VacationModel.findOne({ _id: req.query.id })
		.exec(function (err, vacation) {
			console.log("vacation:", vacation);
			if (err) next(err);
			res.send(vacation);
		});
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