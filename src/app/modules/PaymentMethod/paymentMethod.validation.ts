import { z } from 'zod';
import { PaymentMethodRegistrationStatus } from './paymentMethod.constant';

const createPaymentMethodValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(PaymentMethodRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const upadatePaymentMethodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(PaymentMethodRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const PaymentMethodValidations = {
  createPaymentMethodValidationSchema,
  upadatePaymentMethodSchema,
};
