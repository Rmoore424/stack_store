'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/login', require('../configure/authentication/local'));

router.use('/user', require('./user'));

router.use("/vacation", require('./vacation'));

router.use("/category", require('./category'));
