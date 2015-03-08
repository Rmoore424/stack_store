'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    items: [{ item: {type: mongoose.Schema.Types.ObjectId, ref: 'Vacation'}, quantity: Number }],
    dateCreated: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

mongoose.model('Cart', schema);