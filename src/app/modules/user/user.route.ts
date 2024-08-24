/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
// import { upload } from '../../utils/sendImageToCloudinary';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createModeratorValidationSchema } from '../Moderator/moderator.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import { createDeliveryManValidationSchema } from '../DeliveryMan/deliveryMan.validation';

const router = express.Router();

router.get(
  '/getAllUsers',
  auth(USER_ROLE.superAdmin),
  UserControllers.getSingleUser,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.deliveryMan,
    USER_ROLE.user,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.moderator,
  ),
  UserControllers.getSingleUser,
);

// router.post(
//   '/create-delivery-man',
//   // auth(USER_ROLE.admin),
//   // upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(createDeliveryManValidationSchema),
//   UserControllers.createDeliveryMan,
// );

// router.post(
//   '/create-moderator',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   // upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     // req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(createModeratorValidationSchema),
//   UserControllers.createModerator,
// );

// router.post(
//   '/create-admin',
//   auth(USER_ROLE.superAdmin),
//   // upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     // req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(createAdminValidationSchema),
//   UserControllers.createNormalUser,
// );
router.post(
  '/create-super-admin',
  // upload.single('file'),
  // auth(USER_ROLE.superAdmin),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createSuperAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.post(
  '/change-to-admin/:id',
  auth(USER_ROLE.user),
  UserControllers.changeUserToAdmin,
);

export const UserRoutes = router;
