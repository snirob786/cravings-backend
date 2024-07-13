import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ClassController } from './class.controller';
import { ClassValidations } from './class.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', ClassController.getAllClasses);
router.get('/:id', ClassController.getSingleClass);

router.post(
  '/create-batch',
  auth('admin', 'superAdmin'),
  validateRequest(ClassValidations.createClassValidationSchema),
  ClassController.createClass,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(ClassValidations.upadateClassSchema),
  ClassController.updateClass,
);

router.delete('/:id', auth('admin', 'superAdmin'), ClassController.deleteClass);

export const batchRoutes = router;
