import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PlatterController } from './platter.controller';
import { PlatterValidations } from './platter.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', PlatterController.getAllPlatters);
router.get('/:id', PlatterController.getSinglePlatter);

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(PlatterValidations.createPlatterValidationSchema),
  PlatterController.createPlatter,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(PlatterValidations.upadatePlatterSchema),
  PlatterController.updatePlatter,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  PlatterController.deletePlatter,
);

export const PlattersRoutes = router;
