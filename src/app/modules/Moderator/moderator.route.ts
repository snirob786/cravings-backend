import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { MentorControllers } from './moderator.controller';
import { updateModeratorValidationSchema } from './moderator.validation';

const router = express.Router();

router.get('/:id', MentorControllers.getSingleModerator);

router.patch(
  '/:id',
  validateRequest(updateModeratorValidationSchema),
  MentorControllers.updateModerator,
);

router.delete('/:id', MentorControllers.deleteModerator);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.mentor),
  MentorControllers.getAllModerators,
);

export const ModeratorRoutes = router;
