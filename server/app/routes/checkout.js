'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var OrderModel = mongoose.model('Order');
var CartModel = mongoose.model('Cart');
var stripe = require("stripe")(
  "sk_test_raiW0RRBcENWkVV2L6534BYv"
);


router.post('/', function(req, res, next) {
    console.log(req.body.token);
    stripe.charges.create({
        amount: 4000, //need to insert cart total here in pennies
        currency: "usd",
        source: req.body.token, // obtained with Stripe.js
        description: "Stackations unLTD"
    }, function(err, charge) {
        // asynchronously called
        if (err) next(err);
        console.log("charge created", charge);
        CartModel.findOne({
            _id: req.body.cart._id
        }).exec(function(err, cart) {
            console.log("cart found:", cart);
            OrderModel.create({
                user: cart.user,
                //items: cart.items,
                token: req.body.token,
                total_charge: 4000 //need to insert cart total here
            }, function(err, order) {
                if (err) next(err);
                res.send(order);
            });
        });
    });
});
