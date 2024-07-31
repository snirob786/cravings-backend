import { z } from 'zod';
import { BloodGroup, Gender } from './auth.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const registerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    user: z.object({
      role: z.string().optional(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      // profileImg: z.string(),
    }),
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
