import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { MentorControllers } from './mentor.controller';
import { updateMentorValidationSchema } from './mentor.validation';

const router = express.Router();

router.get('/:id', MentorControllers.getSingleMentor);

router.patch(
  '/:id',
  validateRequest(updateMentorValidationSchema),
  MentorControllers.updateMentor,
);

router.delete('/:id', MentorControllers.deleteMentor);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.mentor),
  MentorControllers.getAllMentors,
);

export const MentorRoutes = router;
