import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SuperAdminControllers } from './superAdmin.controller';
import { updateSuperAdminValidationSchema } from './superAdmin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin),
  SuperAdminControllers.getAllSupperAdmins,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin),
  SuperAdminControllers.getSingleSuperAdmin,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(updateSuperAdminValidationSchema),
  SuperAdminControllers.updateSuperAdmin,
);

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  SuperAdminControllers.deleteSuperAdmin,
);

export const SuperAdminRoutes = router;
