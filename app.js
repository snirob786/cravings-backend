// Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

//Auth:Passport
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
require('./modules/auth/configs/passport');
require('dotenv').config();

// Initialize Express App
const app = express();

//Session Config
app.use(session({
	secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Register Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	console.log(req.session);
	console.log(res.user);
	next()
})

// Import Routes and Middleware
const authRoutes = require('./modules/auth');
const userRoutes = require('./modules/user');
const batchRoutes = require('./modules/batches');
const taskRoutes = require('./modules/tasks');
const submissionRoutes = require('./modules/task-submissions');
const errorHandler = require('./modules/core/middlewares/error-handler');
const authMiddleware = require('./modules/core/middlewares/auth');
const healthCheck = require('./modules/core/health-check');

// Routes
const authenticate = () => passport.authenticate('jwt', { session: false });

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use(authenticate())
app.use('/batches', authMiddleware, batchRoutes);
app.use('/tasks', authMiddleware, taskRoutes);
app.use('/submissions', authMiddleware, submissionRoutes);
app.use('/health', healthCheck);

// Error Handler
app.use(errorHandler);

// Export App
module.exports = app;
