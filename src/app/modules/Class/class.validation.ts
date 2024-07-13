import { z } from 'zod';

const createClassValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    videoUrl: z.string(),
    videoDuration: z.string(),
    content: z.string(),
    releaseDate: z.string().datetime(),
    module: z.string(),
  }),
});

const upadateClassSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    videoUrl: z.string().optional(),
    videoDuration: z.string().optional(),
    content: z.string().optional(),
    releaseDate: z.string().datetime().optional(),
    module: z.string().optional(),
  }),
});

export const ClassValidations = {
  createClassValidationSchema,
  upadateClassSchema,
};
