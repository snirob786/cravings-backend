import mongoose, { Schema } from 'mongoose';
import { DeliveryRegistrationStatus } from './delivery.constant';
import { TDelivery } from './delivery.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const deliverySchema = new mongoose.Schema<TDelivery>(
  {
    deliveryAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    pickUpAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    note: String,
    canceledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    cancelReason: String,
    deliveryMan: {
      type: Schema.Types.ObjectId,
      ref: 'DeliveryMan',
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    status: {
      type: String,
      enum: DeliveryRegistrationStatus,
      default: 'started',
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

export const Delivery = mongoose.model<TDelivery>('Delivery', deliverySchema);
