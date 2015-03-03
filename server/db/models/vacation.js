'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    vacation: String,
    description: String,
    price: Number,
    country: String,
    category: [String]
});

mongoose.model('Vacation', schema);