import { z } from 'zod';
import { AddressRegistrationStatus } from './address.constant';

const createAddressValidationSchema = z.object({
  body: z.object({
    address: z.string(),
    status: z
      .enum([...(AddressRegistrationStatus as [string, ...string[]])])
      .optional(),
    addressType: z.string(),
    country: z.string(),
  }),
});

const upadateAddressSchema = z.object({
  body: z.object({
    address: z.string().optional(),
    status: z
      .enum([...(AddressRegistrationStatus as [string, ...string[]])])
      .optional(),
    addressType: z.string().optional(),
    country: z.string().optional(),
  }),
});

export const AddressValidations = {
  createAddressValidationSchema,
  upadateAddressSchema,
};
