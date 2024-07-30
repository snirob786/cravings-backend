import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidations } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.user,
    USER_ROLE.deliveryMan,
    USER_ROLE.moderator,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  OrderController.getAllOrders,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.user,
    USER_ROLE.deliveryMan,
    USER_ROLE.moderator,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  OrderController.getSingleOrder,
);

router.post(
  '/create',
  auth(USER_ROLE.user),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderController.createOrder,
);

router.patch(
  '/:id',
  auth(
    USER_ROLE.user,
    USER_ROLE.deliveryMan,
    USER_ROLE.moderator,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  validateRequest(OrderValidations.upadateOrderSchema),
  OrderController.updateOrder,
);

router.delete('/:id', auth(USER_ROLE.superAdmin), OrderController.deleteOrder);

export const OrderRoutes = router;
