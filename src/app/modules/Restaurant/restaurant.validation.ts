import { z } from 'zod';
import { RestaurantRegistrationStatus } from './restaurant.constant';

const addressValidationSchema = z.object({
  body: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});

const createRestaurantValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    logo: z.string().optional(),
    status: z.enum([
      ...(RestaurantRegistrationStatus as [string, ...string[]]),
    ]),
    address: addressValidationSchema.optional(),
    restaurantType: z.string().optional(),
    cuisine: z.string().optional(),
    onwerName: z.string().optional(),
    ownerContactNumber: z.string().optional(),
    ownerEmail: z.string().optional(),
  }),
});

const upadateResturantSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    logo: z.string().optional(),
    status: z
      .enum([...(RestaurantRegistrationStatus as [string, ...string[]])])
      .optional(),
    address: addressValidationSchema.optional(),
    restaurantType: z.string().optional(),
    cuisine: z.string().optional(),
    onwerName: z.string().optional(),
    ownerContactNumber: z.string().optional(),
    ownerEmail: z.string().optional(),
  }),
});

export const RestaurantValidations = {
  createRestaurantValidationSchema,
  upadateResturantSchema,
};
