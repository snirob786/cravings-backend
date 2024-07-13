/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
// import { upload } from '../../utils/sendImageToCloudinary';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createMentorValidationSchema } from '../Mentor/mentor.validation';
import { createStudentValidationSchema } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  // upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-mentor',
  // upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createMentorValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  // upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/create-super-admin',
  // upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createSuperAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin', 'superAdmin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get(
  '/me',
  auth('student', 'mentor', 'admin', 'superAdmin'),
  UserControllers.getMe,
);

export const UserRoutes = router;
