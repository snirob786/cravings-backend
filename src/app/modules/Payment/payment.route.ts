import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentController } from './payment.controller';
import { PaymentValidations } from './payment.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getSinglePayment);

router.post(
  '/create',
  auth(USER_ROLE.superAdmin, USER_ROLE.customer),
  validateRequest(PaymentValidations.createPaymentValidationSchema),
  PaymentController.createPayment,
);

router.patch(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.moderator,
    USER_ROLE.customer,
  ),
  validateRequest(PaymentValidations.upadatePaymentSchema),
  PaymentController.updatePayment,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  PaymentController.deletePayment,
);

export const PaymentRoutes = router;
