import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { NormalUserControllers } from './normalUser.controller';
import { updateCustomerValidationSchema } from './normalUser.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.moderator,
    USER_ROLE.deliveryMan,
    USER_ROLE.user,
  ),
  NormalUserControllers.getAllNormalUsers,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.moderator,
    USER_ROLE.deliveryMan,
    USER_ROLE.user,
  ),
  NormalUserControllers.getSingleNormalUser,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.user),
  validateRequest(updateCustomerValidationSchema),
  NormalUserControllers.updateNormalUser,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.user),
  NormalUserControllers.deleteNormalUser,
);

export const NormalUserRoutes = router;
