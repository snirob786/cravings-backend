import { z } from 'zod';
import { BatchRegistrationStatus } from './batch.constant';

const createBatchValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    course: z.string(),
    status: z.enum([...(BatchRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
});

const upadateBatchSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    course: z.string().optional(),
    status: z
      .enum([...(BatchRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    mentor: z.string().optional(),
  }),
});

export const BatchValidations = {
  createBatchValidationSchema,
  upadateBatchSchema,
};
