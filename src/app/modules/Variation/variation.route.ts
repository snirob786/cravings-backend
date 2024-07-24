import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { VariationController } from './variation.controller';
import { VariationValidations } from './variation.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', VariationController.getAllVariations);
router.get('/:id', VariationController.getSingleVariation);

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(VariationValidations.createVariationValidationSchema),
  VariationController.createVariation,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(VariationValidations.upadateVariationSchema),
  VariationController.updateVariation,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  VariationController.deleteVariation,
);

export const VariationsRoutes = router;
