import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidations } from './category.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getSingleCategory);

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryController.createCategory,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(CategoryValidations.upadateCategorySchema),
  CategoryController.updateCategory,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  CategoryController.deleteCategory,
);

export const CategoriesRoutes = router;
