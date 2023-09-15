/**
 * Authentication Module Routes
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();

// Models
const BatchModel = require('./models/batch');

// Controllers
const BatchCtrl = require('./controllers/batch.controller');
const CoreMiddlewares = require('../core/middlewares');
const LoadBatch = CoreMiddlewares.LoadModelByID({ model: BatchModel });

// Routes
router.get('/', BatchCtrl.Index);

router.post('/add', BatchCtrl.Add);

router.post('/:id/edit', [LoadBatch], BatchCtrl.Edit);

module.exports = router;