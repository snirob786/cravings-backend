import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserPackageController } from './userPackage.controller';
import { UserPackageValidations } from './userPackage.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.deliveryMan,
    USER_ROLE.moderator,
    USER_ROLE.user,
  ),
  UserPackageController.getAllUserPackages,
);
router.get('/:id', UserPackageController.getSingleUserPackage);

router.post(
  '/create',
  auth(USER_ROLE.superAdmin),
  validateRequest(UserPackageValidations.createUserPackageValidationSchema),
  UserPackageController.createUserPackage,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(UserPackageValidations.upadateUserPackageSchema),
  UserPackageController.updateUserPackage,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  UserPackageController.deleteUserPackage,
);

export const UserPackageRoutes = router;
