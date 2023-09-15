/**
 * Authentication Module Routes
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const StudentCtrl = require('./controllers/student.controller');

// Routes

router.use((req, res, next) => {
	if (req.user.role != 'student') return res.redirect('/');
	return next();
})


router.get('/dashboard', StudentCtrl.Dashboard);

module.exports = router;
