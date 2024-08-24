import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

// router.post(
//   '/change-to-admin',
//   auth(USER_ROLE.user),
//   // validateRequest(AuthValidation.loginValidationSchema),
//   AuthControllers.changeUserPackage,
// );

// router.post(
//   '/change-password',
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   auth(),
//   AuthControllers.changePassword,
// );

export const AuthRoutes = router;
