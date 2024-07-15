import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MenuItemController } from './menuItem.controller';
import { CategoryValidations } from './menuItem.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', MenuItemController.getAllMenuItems);
router.get('/:id', MenuItemController.getSingleMenuItem);

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  MenuItemController.createMenuItem,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(CategoryValidations.upadateCategorySchema),
  MenuItemController.updateMenuItem,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  MenuItemController.deleteMenuItem,
);

export const MenuItemRoutes = router;
