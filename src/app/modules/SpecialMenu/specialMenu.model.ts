import mongoose, { Schema } from 'mongoose';
import { SpecialMenuRegistrationStatus } from './specialMenu.constant';
import { TSpecialMenu } from './specialMenu.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const specialMenuSchema = new mongoose.Schema<TSpecialMenu>(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
    },
    status: {
      type: String,
      enum: SpecialMenuRegistrationStatus,
      default: 'active',
    },
    platter: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Platter',
      },
    ],
    menuItem: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
      },
    ],
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

export const SpecialMenu = mongoose.model<TSpecialMenu>(
  'SpecialMenu',
  specialMenuSchema,
);
