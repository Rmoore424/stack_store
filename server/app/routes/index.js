'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/login', require('../configure/authentication/local'));

router.use('/user', require('./user'));

router.use("/vacations", require('./vacation'));

router.use("/categories", require('./category'));
