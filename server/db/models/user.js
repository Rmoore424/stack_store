'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    address: {
        address_1: String,
        address_2: String,
        city: String,
        state: String, 
        zip: String
    },
    phone: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }, 
    order: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    admin: {
        type: Boolean,
        default: false
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
schema.method('generateSalt',function () {
    return crypto.randomBytes(16).toString('base64');
});

schema.method('encryptPassword', function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
});

schema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {
        user.salt = user.generateSalt();
        user.password = user.encryptPassword(user.password, user.salt);
    }

    next();

});

schema.method('correctPassword', function (candidatePassword) {
    return this.encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);