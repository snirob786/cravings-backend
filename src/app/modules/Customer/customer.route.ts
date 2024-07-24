import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerControllers } from './customer.controller';
import { updateCustomerValidationSchema } from './customer.validation';
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
  CustomerControllers.getAllCustomers,
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
  CustomerControllers.getSingleCustomer,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.customer),
  validateRequest(updateCustomerValidationSchema),
  CustomerControllers.updateCustomer,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.customer),
  CustomerControllers.deleteCustomer,
);

export const CustomerRoutes = router;
