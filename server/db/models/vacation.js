'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    region: String,
    category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    imageUrl: String
});

mongoose.model('Vacation', schema);