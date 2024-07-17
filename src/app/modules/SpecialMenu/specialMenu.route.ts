import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SpecialMenuController } from './specialMenu.controller';
import { SpecialMenuValidations } from './specialMenu.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', SpecialMenuController.getAllSpecialMenus);
router.get('/:id', SpecialMenuController.getSingleSpecialMenu);

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(SpecialMenuValidations.createSpecialMenuValidationSchema),
  SpecialMenuController.createSpecialMenu,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(SpecialMenuValidations.updateSpecialMenuSchema),
  SpecialMenuController.updateSpecialMenu,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  SpecialMenuController.deleteSpecialMenu,
);

export const SpecialMenusRoutes = router;
