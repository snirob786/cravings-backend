import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReportController } from './report.controller';
import { RatingValidations } from './report.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
    USER_ROLE.admin,
    USER_ROLE.moderator,
    USER_ROLE.superAdmin,
  ),
  ReportController.getAllReport,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
    USER_ROLE.admin,
    USER_ROLE.moderator,
    USER_ROLE.superAdmin,
  ),
  ReportController.getSingleReport,
);

router.post(
  '/create',
  auth(
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
    USER_ROLE.admin,
    USER_ROLE.moderator,
  ),
  validateRequest(RatingValidations.createRatingValidationSchema),
  ReportController.createReport,
);

router.patch(
  '/:id',
  auth(
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
    USER_ROLE.admin,
    USER_ROLE.moderator,
  ),
  validateRequest(RatingValidations.upadateRatingSchema),
  ReportController.updateReport,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  ReportController.deleteReport,
);

export const ReportRoutes = router;
