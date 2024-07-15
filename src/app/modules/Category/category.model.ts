import mongoose, { Schema } from 'mongoose';
import { CategoryRegistrationStatus } from './category.constant';
import { TCategory } from './category.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const categorySchema = new mongoose.Schema<TCategory>(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
    },
    status: {
      type: String,
      enum: CategoryRegistrationStatus,
      default: 'active',
    },
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
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

export const Category = mongoose.model<TCategory>('Category', categorySchema);
