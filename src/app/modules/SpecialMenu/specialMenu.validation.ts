import { z } from 'zod';
import { SpecialMenuRegistrationStatus } from './specialMenu.constant';

const createSpecialMenuValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(SpecialMenuRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const updateSpecialMenuSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(SpecialMenuRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const SpecialMenuValidations = {
  createSpecialMenuValidationSchema,
  updateSpecialMenuSchema,
};
