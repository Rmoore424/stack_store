'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    description: String
});

mongoose.model('Category', schema);