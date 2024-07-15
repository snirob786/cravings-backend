import mongoose, { Schema } from 'mongoose';
import { SubCategoryRegistrationStatus } from './subCategory.constant';
import { TSubCategory } from './subCategory.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const subCategorySchema = new mongoose.Schema<TSubCategory>(
  {
    title: {
      type: String,
      required: [true, 'Sub Category title is required'],
    },
    status: {
      type: String,
      enum: SubCategoryRegistrationStatus,
      default: 'active',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
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

export const SubCategory = mongoose.model<TSubCategory>(
  'SubCategory',
  subCategorySchema,
);
