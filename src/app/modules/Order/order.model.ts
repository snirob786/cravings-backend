import mongoose, { Schema } from 'mongoose';
import { OrderRegistrationStatus } from './order.constant';
import { TOrder } from './order.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const orderSchema = new mongoose.Schema<TOrder>(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    status: {
      type: String,
      enum: OrderRegistrationStatus,
      default: 'started',
    },
    menuItem: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'MenuItem',
        },
        quantity: Number,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    platter: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'Platter',
        },
        quantity: Number,
      },
    ],
    specialMenu: {
      type: Schema.Types.ObjectId,
      ref: 'SpecialMenu',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    superAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'SuperAdmin',
    },
    moderator: {
      type: Schema.Types.ObjectId,
      ref: 'Moderator',
    },
    deliveryMan: {
      type: Schema.Types.ObjectId,
      ref: 'DeliveryMan',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    delivery: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    totalPrice: Number,
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant is required'],
    },
    canceledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    cancelReason: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model<TOrder>('Order', orderSchema);
