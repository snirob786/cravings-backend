import mongoose, { Schema } from 'mongoose';
import { PaymentRegistrationStatus } from './payment.constant';
import { TPayment } from './payment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const paymentSchema = new mongoose.Schema<TPayment>(
  {
    status: {
      type: String,
      enum: PaymentRegistrationStatus,
      default: 'pending',
    },
    transactionId: String,
    referenceId: String,
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethod',
    },
    amount: Number,
    paymentPhone: String,
    paymentEmail: String,
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant is required'],
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

export const Payment = mongoose.model<TPayment>('Payment', paymentSchema);
