'use strict';
var mongoose = require('mongoose');

function centsToDollars (price) {
    console.log('price', price);
    return (price/100).toFixed(2);
};

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
        required: true,
        get: centsToDollars
    },
    region: String,
    category: { type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}], required: true },
    imageUrl: String,
    url_name: String
});



schema.methods.computeUrlName = function () {
    var url = this.name.replace(/[\W\s]/g, '_');
    if (url.charAt(url.length-1) == ('_')) {
                url = url.substring(0, url.length-1);
            }
    this.url_name = url;
};

schema.methods.dollarsToCents = function () {
    console.log('do I get called');
    var price = this.price * 100;
    this.price = price;
};

schema.pre('save', function(next) {
    this.computeUrlName();
    this.dollarsToCents();
    next();
});

schema.virtual('full_route').get(function () {
    return '/vacation/' + this.url_name;
});

schema.set('toJSON', {virtuals: true});

var Vacation = mongoose.model('Vacation', schema);

module.exports = Vacation;