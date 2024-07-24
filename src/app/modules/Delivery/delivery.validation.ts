import { z } from 'zod';
import { DeliveryRegistrationStatus } from './delivery.constant';

const createDeliveryValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(DeliveryRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const upadateDeliverySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(DeliveryRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const DeliveryValidations = {
  createDeliveryValidationSchema,
  upadateDeliverySchema,
};
