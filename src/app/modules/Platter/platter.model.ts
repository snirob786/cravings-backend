import mongoose, { Schema } from 'mongoose';
import { PlatterRegistrationStatus } from './platter.constant';
import { TPlatter } from './platter.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const platterSchema = new mongoose.Schema<TPlatter>(
  {
    title: {
      type: String,
      required: [true, 'Platter title is required'],
    },
    status: {
      type: String,
      enum: PlatterRegistrationStatus,
      default: 'active',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
    menuItem: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
      },
    ],
    specialMenu: {
      type: Schema.Types.ObjectId,
      ref: 'SpecialMenu',
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
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

export const Platter = mongoose.model<TPlatter>('Platter', platterSchema);
