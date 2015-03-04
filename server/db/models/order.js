'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    order_number: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, default: 'Created' },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    date: {type: Date, default: Date.now},
    total_charge: Number
});

mongoose.model('Order', schema);