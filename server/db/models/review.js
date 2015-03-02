'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    rating: Number,
    text: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    date: Date
});

mongoose.model('Review', schema);