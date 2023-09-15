/**
 * Authentication Module Routes
 */

// ExpressJS Core
const express = require('express');
const router = express.Router();

// Models
const TaskSubmissionModel = require('./models/task-submission');

// Controllers
const TaskSubmissionCtrl = require('./controllers/task-submission.controller');
const CoreMiddlewares = require('../core/middlewares');
const LoadTaskSubmission = CoreMiddlewares.LoadModelByID({ model: TaskSubmissionModel });

// Routes
router.get('/', TaskSubmissionCtrl.Index);

router.post('/add', TaskSubmissionCtrl.Add);

router.post('/:id/edit', [LoadTaskSubmission], TaskSubmissionCtrl.Edit);

module.exports = router;