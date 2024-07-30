import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RatingController } from './rating.controller';
import { RatingValidations } from './rating.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', RatingController.getAllRatings);
router.get('/:id', RatingController.getSingleRating);

router.post(
  '/create',
  auth(USER_ROLE.deliveryMan, USER_ROLE.user),
  validateRequest(RatingValidations.createRatingValidationSchema),
  RatingController.createRating,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.user, USER_ROLE.deliveryMan),
  validateRequest(RatingValidations.upadateRatingSchema),
  RatingController.updateRating,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  RatingController.deleteRating,
);

export const RatingRoutes = router;
