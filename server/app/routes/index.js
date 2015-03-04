'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));

router.use('/login', require('../configure/authentication/local'));

router.use('/signup', require('./signup'));

router.use('/admin', require('./admin'));
