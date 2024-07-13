import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string().min(3),
});

const createVehicleValidationSchema = z.object({
  type: z.string(),
  numberPlate: z.string().optional(),
  brand: z.string().optional(),
  companyName: z.string(),
  model: z.string().optional(),
  otherDetails: z.string().optional(),
});

export const createDeliveryManValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    deliveryMan: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      vehicle: createVehicleValidationSchema.optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string(),
  lastName: z.string().min(1),
});

const updateDeliveryManValidationSchema = z.object({
  type: z.string().optional(),
  numberPlate: z.string().optional(),
  brand: z.string().optional(),
  companyName: z.string().optional(),
  model: z.string().optional(),
  otherDetails: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      vehicle: updateDeliveryManValidationSchema.optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema: createDeliveryManValidationSchema,
  updateStudentValidationSchema,
};
