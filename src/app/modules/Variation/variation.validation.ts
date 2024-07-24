import { z } from 'zod';
import { VariationRegistrationStatus } from './variation.constant';

const createVariationValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(VariationRegistrationStatus as [string, ...string[]])])
      .optional(),
    category: z.string(),
    restaurant: z.string(),
  }),
});

const upadateVariationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(VariationRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const VariationValidations = {
  createVariationValidationSchema,
  upadateVariationSchema,
};
