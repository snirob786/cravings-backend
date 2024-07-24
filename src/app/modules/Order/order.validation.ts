import { z } from 'zod';
import { OrderRegistrationStatus } from './order.constant';

const createOrderValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(OrderRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const upadateOrderSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(OrderRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  upadateOrderSchema,
};
