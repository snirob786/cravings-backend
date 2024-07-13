import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BatchController } from './batch.controller';
import { BatchValidations } from './batch.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', BatchController.getAllBatches);
router.get('/:id', BatchController.getSingleBatch);

router.post(
  '/create-batch',
  auth('admin', 'superAdmin'),
  validateRequest(BatchValidations.createBatchValidationSchema),
  BatchController.createBatch,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(BatchValidations.upadateBatchSchema),
  BatchController.updateBatch,
);

router.delete('/:id', auth('admin', 'superAdmin'), BatchController.deleteBatch);

export const batchRoutes = router;
