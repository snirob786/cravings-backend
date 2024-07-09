/**
 * Authentication Module Routes
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();

// Controllers
const AuthCtrl = require('./controllers/authentication.controller');

// Routes
router.get('/', AuthCtrl.DefaultMessageView);
router.post('/login', AuthCtrl.DoLogin);
router.post('/signup', AuthCtrl.DoSignUp);
router.post('/jwt-verify', AuthCtrl.JwtVerify);

module.exports = router;
