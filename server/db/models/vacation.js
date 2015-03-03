'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    region: String,
    category: [String],
    imageUrl: String
});

mongoose.model('Vacation', schema);