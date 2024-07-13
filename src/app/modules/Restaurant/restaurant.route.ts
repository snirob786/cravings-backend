import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RestaurantController } from './restaurant.controller';
import { RestaurantValidations } from './restaurant.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', RestaurantController.getAllRestaurants);
router.get('/:id', RestaurantController.getSingleRestaurant);

router.post(
  '/create-restaurant',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(RestaurantValidations.createRestaurantValidationSchema),
  RestaurantController.createRestaurant,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(RestaurantValidations.upadateResturantSchema),
  RestaurantController.updateRestaurant,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  RestaurantController.deleteRestaurant,
);

export const restaurantRoutes = router;
