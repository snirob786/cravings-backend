import { z } from 'zod';
import { PaymentRegistrationStatus } from './payment.constant';

const createPaymentValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(PaymentRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const upadatePaymentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(PaymentRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const PaymentValidations = {
  createPaymentValidationSchema,
  upadatePaymentSchema,
};
