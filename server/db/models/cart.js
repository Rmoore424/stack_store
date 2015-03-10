'use strict';
var mongoose = require('mongoose');

// function centsToDollars (price) {
//     console.log('price', price);
//     return (price/100).toFixed(2);
// };

var schema = new mongoose.Schema({
    items: [{ item: {type: mongoose.Schema.Types.ObjectId, ref: 'Vacation'}, quantity: Number }],
    dateCreated: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // total: { type: Number, default: 0, get: centsToDollars }
});

// schema.methods.getTotal = function () {
// 	var total = 0;
// 	var cart = this;
//     for(var i = 0; i < this.items.length; i++){
//         var item = items[i];
//         if (item) {
//         	total += (item.item.price * item.quantity);
//         }
//     }
// 	this.total = total;
// };

// schema.methods.dollarsToCents = function () {
//     console.log('do I get called');
//     var total = this.total * 100;
//     this.total = total;
// };

// schema.pre('save', function () {
// 	this.getTotal().then(this.dollarsToCents);
// });

mongoose.model('Cart', schema);