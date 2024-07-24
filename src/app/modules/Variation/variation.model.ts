import mongoose, { Schema } from 'mongoose';
import { VariationRegistrationStatus } from './variation.constant';
import { TVariation } from './variation.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const variationSchema = new mongoose.Schema<TVariation>(
  {
    variationType: {
      type: String,
      required: [true, 'Variation type is required'],
    },
    title: {
      type: String,
      required: [true, 'Variation title is required'],
    },
    status: {
      type: String,
      enum: VariationRegistrationStatus,
      default: 'active',
    },
    unitType: {
      type: String,
      required: [true, 'Variation unit type is required'],
    },
    unit: {
      type: Number,
      required: [true, 'Variation unit is required'],
    },
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
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

export const Variation = mongoose.model<TVariation>(
  'Variation',
  variationSchema,
);
