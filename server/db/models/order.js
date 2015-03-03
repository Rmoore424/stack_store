'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    order_number: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    date: Date,
    total_charge: Number,
    status: { type: String, default: 'Created' }
});


mongoose.model('Order', schema);