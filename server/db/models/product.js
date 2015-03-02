'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    widget: String,
    category: [String],
    description: String,
    price: Number,
    color: String,
    manufacturer: String
});


schema.virtual('average_rating').get(function(){
    //maybe we need this? maybe we don't?
    return "something";
})

mongoose.model('Product', schema);