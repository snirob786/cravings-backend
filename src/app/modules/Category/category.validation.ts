import { z } from 'zod';
import { CategoryRegistrationStatus } from './category.constant';

const createCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(CategoryRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const upadateCategorySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(CategoryRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  upadateCategorySchema,
};
