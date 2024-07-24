import mongoose, { Schema } from 'mongoose';
import { MenuItemRegistrationStatus } from './menuItem.constant';
import { TMenuItem } from './menuItem.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const menuItemSchema = new mongoose.Schema<TMenuItem>(
  {
    title: {
      type: String,
      required: [true, 'Item title is required'],
    },
    status: {
      type: String,
      enum: MenuItemRegistrationStatus,
      default: 'active',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    hasVariation: {
      type: Boolean,
      default: false,
    },
    variations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Variation',
      },
    ],

    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantiy is required'],
    },
    notes: String,
    description: String,
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

export const MenuItem = mongoose.model<TMenuItem>('MenuItem', menuItemSchema);
