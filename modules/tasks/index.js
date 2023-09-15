/**
 * Authentication Module Routes
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();

// Models
const TaskModel = require('./models/task');

// Controllers
const TaskCtrl = require('./controllers/task.controller');
const CoreMiddlewares = require('../core/middlewares');
const LoadTask = CoreMiddlewares.LoadModelByID({ model: TaskModel });

// Routes
router.get('/', TaskCtrl.Index);

router.post('/add', TaskCtrl.Add);

router.post('/:id/edit', [LoadTask], TaskCtrl.Edit);

module.exports = router;