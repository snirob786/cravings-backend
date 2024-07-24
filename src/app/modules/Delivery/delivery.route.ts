import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DeliveryController } from './delivery.controller';
import { DeliveryValidations } from './delivery.validation';
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
    USER_ROLE.customer,
  ),
  DeliveryController.getAllDeliveries,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.moderator,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
  ),
  DeliveryController.getSingleDelivery,
);

router.post(
  '/create',
  auth(USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(DeliveryValidations.createDeliveryValidationSchema),
  DeliveryController.createDelivery,
);

router.patch(
  '/:id',
  auth(USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(DeliveryValidations.upadateDeliverySchema),
  DeliveryController.updateDelivery,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  DeliveryController.deleteDelivery,
);

export const DeliveriesRoutes = router;
