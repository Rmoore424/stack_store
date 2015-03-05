'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var VacationModel = mongoose.model('Vacation');

router.get('/vacation', function (req, res, next) {
	VacationModel.find({})
		.exec(function (err, vacations) {
			if (err) next(err);
			res.send(vacations);
		});
});

router.post('/makeVacation', function (req, res, next) {	
    VacationModel.create(req.body, function(err, vacation){
    	if(err) next(err);
    	res.send(vacation);
    });
});