import mongoose, { Schema } from 'mongoose';
import { TRating } from './rating.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const ratingSchema = new mongoose.Schema<TRating>(
  {
    rating: {
      type: Number,
      required: [true, 'Address is required'],
    },
    review: String,
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    platter: {
      type: Schema.Types.ObjectId,
      ref: 'Platter',
    },
    specialMenu: {
      type: Schema.Types.ObjectId,
      ref: 'SpecialMenu',
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

export const Rating = mongoose.model<TRating>('Rating', ratingSchema);
