import mongoose, { Schema } from 'mongoose';
import {
  PaymentMethodRegistrationStatus,
  PaymentMethodTypesEnum,
} from './paymentMethod.constant';
import { TPaymentMethod } from './paymentMethod.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const paymentMethodSchema = new mongoose.Schema<TPaymentMethod>(
  {
    status: {
      type: String,
      enum: PaymentMethodRegistrationStatus,
      default: 'active',
    },
    title: {
      type: String,
      required: [true, 'Payment method title is required'],
    },
    type: {
      type: String,
      enum: PaymentMethodTypesEnum,
      required: [true, 'Payment method type is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const PaymentMethod = mongoose.model<TPaymentMethod>(
  'PaymentMethod',
  paymentMethodSchema,
);
