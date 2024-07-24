import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethodValidations } from './paymentMethod.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin),
  PaymentMethodController.getAllPaymentMethods,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
    USER_ROLE.moderator,
    USER_ROLE.superAdmin,
  ),
  PaymentMethodController.getSinglePaymentMethod,
);

router.post(
  '/create',
  auth(USER_ROLE.deliveryMan, USER_ROLE.customer),
  validateRequest(PaymentMethodValidations.createPaymentMethodValidationSchema),
  PaymentMethodController.createPaymentMethod,
);

router.patch(
  '/:id',
  auth(USER_ROLE.deliveryMan, USER_ROLE.customer),
  validateRequest(PaymentMethodValidations.upadatePaymentMethodSchema),
  PaymentMethodController.updatePaymentMethod,
);

router.delete(
  '/:id',
  auth(USER_ROLE.deliveryMan, USER_ROLE.customer),
  PaymentMethodController.deletePaymentMethod,
);

export const PaymentMethodRoutes = router;
