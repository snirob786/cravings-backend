/**
 * Authentication Module Routes
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const AdminCtrl = require('./controllers/admin.controller');

// Models
const UserModel = require('./models/user');

// Middlewares
const CoreMiddlewares = require('../core/middlewares');
const LoadUser = CoreMiddlewares.LoadModel({ model: UserModel });

// Routes
router.use((req, res, next) => {
	if (req.user.role != 'admin') return res.redirect('/');
	return next();
})

router.get('/', AdminCtrl.Index);
router.post('/partners/add', AdminCtrl.AddPartner); //TODO

router.post('/partners/:id/edit', [LoadUser], AdminCtrl.EditPartner); //TODO 

module.exports = router;
