import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryValidations } from './subCategory.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', SubCategoryController.getAllSubCategories);
router.get('/:id', SubCategoryController.getSingleSubCategory);

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(SubCategoryValidations.createSubCategoryValidationSchema),
  SubCategoryController.createSubCategory,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(SubCategoryValidations.upadateSubCategorySchema),
  SubCategoryController.updateSubCategory,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  SubCategoryController.deleteSubCategory,
);

export const SubCategoriesRoutes = router;
