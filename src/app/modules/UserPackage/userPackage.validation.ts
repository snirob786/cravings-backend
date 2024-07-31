import { z } from 'zod';
import { UserPackageStatus } from './userPackage.constant';

const createUserPackageValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    price: z.number(),
    validityDays: z.number(),
    menuItemLimit: z.number(),
    specialMenuLimit: z.number(),
    platterLimit: z.number(),
    moderatorLimit: z.number(),
    status: z
      .enum([...(UserPackageStatus as [string, ...string[]])])
      .optional(),
  }),
});

const upadateUserPackageSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number(),
    validityDays: z.number(),
    menuItemLimit: z.number(),
    specialMenuLimit: z.number(),
    platterLimit: z.number(),
    moderatorLimit: z.number(),
    status: z
      .enum([...(UserPackageStatus as [string, ...string[]])])
      .optional(),
  }),
});

export const UserPackageValidations = {
  createUserPackageValidationSchema,
  upadateUserPackageSchema,
};
