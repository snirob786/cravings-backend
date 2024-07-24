import { z } from 'zod';
import { PlatterRegistrationStatus } from './platter.constant';

const createPlatterValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([...(PlatterRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string(),
  }),
});

const upadatePlatterSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...(PlatterRegistrationStatus as [string, ...string[]])])
      .optional(),
    restaurant: z.string().optional(),
  }),
});

export const PlatterValidations = {
  createPlatterValidationSchema,
  upadatePlatterSchema,
};
