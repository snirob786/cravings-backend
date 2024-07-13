import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ModuleController } from './module.controller';
import { ModuleValidations } from './module.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', ModuleController.getAllModules);
router.get('/:id', ModuleController.getSingleModule);

router.post(
  '/create-batch',
  auth('admin', 'superAdmin'),
  validateRequest(ModuleValidations.createModuleValidationSchema),
  ModuleController.createModule,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(ModuleValidations.upadateModuleSchema),
  ModuleController.updateModule,
);

router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  ModuleController.deleteModule,
);

export const ModulesRoutes = router;
