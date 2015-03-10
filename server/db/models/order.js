'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    //order_number: { type: Number, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: { type: String, default: 'Created' },
    items: { type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Vacation'}], required: true},
    date: {type: Date, default: Date.now},
    total_charge: {type: Number, required: true},
    token: String
});

mongoose.model('Order', schema);