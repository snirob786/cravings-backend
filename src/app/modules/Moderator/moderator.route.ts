import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ModeratorControllers } from './moderator.controller';
import { updateModeratorValidationSchema } from './moderator.validation';

const router = express.Router();

router.get('/:id', ModeratorControllers.getSingleModerator);

router.patch(
  '/:id',
  validateRequest(updateModeratorValidationSchema),
  ModeratorControllers.updateModerator,
);

router.delete('/:id', ModeratorControllers.deleteModerator);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.moderator),
  ModeratorControllers.getAllModerators,
);

export const ModeratorRoutes = router;
