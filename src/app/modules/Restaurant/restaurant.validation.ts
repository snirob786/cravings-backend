import { z } from 'zod';
import { RestaurantRegistrationStatus } from './restaurant.constant';

const createRestaurantValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    course: z.string(),
    status: z.enum([
      ...(RestaurantRegistrationStatus as [string, ...string[]]),
    ]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
});

const upadateResturantSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    course: z.string().optional(),
    status: z
      .enum([...(RestaurantRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    mentor: z.string().optional(),
  }),
});

export const RestaurantValidations = {
  createRestaurantValidationSchema,
  upadateResturantSchema,
};
