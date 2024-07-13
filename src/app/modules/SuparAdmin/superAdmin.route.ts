import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SuperAdminControllers } from './superAdmin.controller';
import { updateSuperAdminValidationSchema } from './superAdmin.validation';

const router = express.Router();

router.get('/', SuperAdminControllers.getAllSupperAdmins);

router.get('/:id', SuperAdminControllers.getSingleSuperAdmin);

router.patch(
  '/:id',
  validateRequest(updateSuperAdminValidationSchema),
  SuperAdminControllers.updateSuperAdmin,
);

router.delete('/:adminId', SuperAdminControllers.deleteSuperAdmin);

export const SuperAdminRoutes = router;
