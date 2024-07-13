import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  auth('admin', 'mentor', 'superAdmin'),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  '/:id',
  auth('admin', 'mentor', 'superAdmin'),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
