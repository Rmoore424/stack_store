'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true
    },
    description: { 
    	type: String,
    	required: true
    },
    price: {
    	type: Number,
    	required: true
    },
    region: String,
    category: { type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}], required: true },
    imageUrl: String
});

var Vacation = mongoose.model('Vacation', schema);

module.exports = Vacation;