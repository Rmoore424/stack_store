'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    rating: {type: Number, min: 1, max: 5, required: true},
    review: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    vacation: {type: mongoose.Schema.Types.ObjectId, ref: 'Vacation'},
    date: {type: Date, default: Date.now}
});

mongoose.model('Review', schema);