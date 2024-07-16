import { z } from 'zod';
import { SubCategoryRegistrationStatus } from './subCategory.constant';

const createSubCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(SubCategoryRegistrationStatus as [string, ...string[]])])
      .optional(),
    category: z.string(),
    restaurant: z.string(),
  }),
});

const upadateSubCategorySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(SubCategoryRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const SubCategoryValidations = {
  createSubCategoryValidationSchema,
  upadateSubCategorySchema,
};
