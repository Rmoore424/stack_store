'use strict';
var async =  require('async'),
	mongoose = require('mongoose');

require("./");
var Category = mongoose.model('Category');

var categories = [
	{name: "Otherworldly"},
	{name: "Adventure"},
	{name: "Fictional"},
	{name: 'Time Travel'}
];

var bluebird = require('bluebird');
var mongoose = require('mongoose');

var seed = function () {
    Category.create(categories, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('Database seeded! yay!');
        process.kill(0);
    });
};
seed();

