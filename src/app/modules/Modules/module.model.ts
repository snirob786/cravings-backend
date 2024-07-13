import mongoose, { Schema } from 'mongoose';
import { TModule } from './module.interface';
import { ModuleStatus } from './module.constant';

const moduleSchema = new mongoose.Schema<TModule>(
  {
    title: {
      type: String,
      required: [true, 'Batch title is required'],
    },
    course: {
      type: Schema.Types.ObjectId,
      required: [true, 'Course id is required'],
      ref: 'Course',
    },
    batch: {
      type: Schema.Types.ObjectId,
      required: [true, 'Batch id is required'],
      ref: 'Batch',
    },
    status: {
      type: String,
      enum: ModuleStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      required: [true, 'Mentor id is required'],
      ref: 'Mentor',
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

export const Module = mongoose.model<TModule>('Module', moduleSchema);
