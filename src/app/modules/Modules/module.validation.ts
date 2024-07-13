import { z } from 'zod';
import { ModuleRegistrationStatus } from './module.constant';

const createModuleValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    course: z.string(),
    batch: z.string(),
    status: z.enum([...(ModuleRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    mentor: z.string(),
  }),
});

const upadateModuleSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    course: z.string().optional(),
    status: z
      .enum([...(ModuleRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    mentor: z.string().optional(),
  }),
});

export const ModuleValidations = {
  createModuleValidationSchema,
  upadateModuleSchema,
};
