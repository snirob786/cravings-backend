/**
 * User Module Routes Index
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();

// Routes

router.use('/admin', require('./routes-admin'));

router.use('/', require('./routes-student'));

module.exports = router;
