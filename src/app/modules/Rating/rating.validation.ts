import { z } from 'zod';

const createRatingValidationSchema = z.object({
  body: z.object({
    rating: z.number(),
    restaurant: z.string(),
  }),
});

const upadateRatingSchema = z.object({
  body: z.object({
    rating: z.number().optional(),
    restaurant: z.string().optional(),
  }),
});

export const RatingValidations = {
  createRatingValidationSchema,
  upadateRatingSchema,
};
