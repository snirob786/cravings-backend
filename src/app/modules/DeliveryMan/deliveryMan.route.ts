import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DeliveryManControllers } from './deliveryMan.controller';
import { updateDelivryManValidationSchema } from './deliveryMan.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.deliveryMan,
    USER_ROLE.superAdmin,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
  ),
  DeliveryManControllers.getAllDeliveryMans,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.deliveryMan,
    USER_ROLE.superAdmin,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
  ),
  DeliveryManControllers.getSingleDeliveryMan,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.deliveryMan, USER_ROLE.superAdmin),
  validateRequest(updateDelivryManValidationSchema),
  DeliveryManControllers.updateDeliveryMan,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  DeliveryManControllers.deleteDeliveryMan,
);

export const DeliveryManRoutes = router;
