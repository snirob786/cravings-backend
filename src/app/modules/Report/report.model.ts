import mongoose, { Schema } from 'mongoose';
import { TReport } from './report.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const reportSchema = new mongoose.Schema<TReport>(
  {
    reportFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fromRole: String,
    reportAbout: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    aboutRole: String,
    issues: String,
  },
  {
    timestamps: true,
  },
);

export const Report = mongoose.model<TReport>('Report', reportSchema);
