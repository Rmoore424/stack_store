'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var VacationModel = mongoose.model('Vacation');
var CategoryModel = mongoose.model('Category');

router.get('/vacation', function (req, res, next) {
	VacationModel.find({})
		.exec(function (err, vacations) {
			if (err) next(err);
			res.send(vacations);
		});
});

router.get('/vacations_by_category', function (req, res, next) {
	VacationModel.find({})
	.exec(function (err, vacations) {
		vacations = vacations.filter(function (el) {
			return el.category.indexOf(req.query.id) > -1;
		});
		res.send(vacations);
	});
});

router.post('/makeVacation', function (req, res, next) {	
    VacationModel.create(req.body, function(err, vacation){
    	if(err) next(err);
    	res.send(vacation);
    });
});