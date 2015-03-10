'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/login', require('../configure/authentication/local'));

router.use('/user', require('./user'));

router.use("/vacations", require('./vacations'));

router.use("/categories", require('./categories'));

router.use('/cart', require('./cart'));

router.use("/review", require('./review'));

router.use("/checkout", require('./checkout'));
