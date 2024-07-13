import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required.' }),
    email: z.string().email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['user', 'admin']),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required.' }),
    password: z.string({ required_error: 'Password is required' }),
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
