import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AddressController } from './address.controller';
import { AddressValidations } from './address.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', AddressController.getAllAddresses);
router.get('/:id', AddressController.getSingleAddress);

router.post(
  '/create',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.moderator,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
  ),
  validateRequest(AddressValidations.createAddressValidationSchema),
  AddressController.createAddress,
);

router.patch(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.moderator,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
  ),
  validateRequest(AddressValidations.upadateAddressSchema),
  AddressController.updateAddress,
);

router.delete(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.moderator,
    USER_ROLE.deliveryMan,
    USER_ROLE.customer,
  ),
  AddressController.deleteAddress,
);

export const AddressRoutes = router;
