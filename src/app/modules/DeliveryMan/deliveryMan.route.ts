import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DeliveryManControllers } from './deliveryMan.controller';
import { updateStudentValidationSchema } from './deliveryMan.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', DeliveryManControllers.getAllDeliveryMans);

router.get('/:id', DeliveryManControllers.getSingleDeliveryMan);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.moderator, USER_ROLE.superAdmin),
  validateRequest(updateStudentValidationSchema),
  DeliveryManControllers.updateDeliveryMan,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.moderator, USER_ROLE.superAdmin),
  DeliveryManControllers.deleteDeliveryMan,
);

export const DeliveryManRoutes = router;
