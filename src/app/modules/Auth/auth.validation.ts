import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required.' }),
    email: z.string().email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password can not be less than 8 characters' }),
    role: z.enum(['user']),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required.' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password can not be less than 8 characters' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current password is required',
    }),
    newPassword: z.string({ required_error: 'New Password is required' }),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
