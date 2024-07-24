import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ModeratorControllers } from './moderator.controller';
import { updateModeratorValidationSchema } from './moderator.validation';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ModeratorControllers.getAllModerators,
);
router.get('/:id', ModeratorControllers.getSingleModerator);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderator),
  validateRequest(updateModeratorValidationSchema),
  ModeratorControllers.updateModerator,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  ModeratorControllers.deleteModerator,
);

export const ModeratorRoutes = router;
