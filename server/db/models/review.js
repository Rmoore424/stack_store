'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    rating: {type: Number, min: 1, max: 5},
    text: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    date: {type: Date, default: Date.now}
});

mongoose.model('Review', schema);