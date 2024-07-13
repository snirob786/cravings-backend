import mongoose, { Schema } from 'mongoose';
import { TBatchStudent } from './batchStudent.interface';

const batchStudentSchema = new mongoose.Schema<TBatchStudent>(
  {
    batch: {
      type: Schema.Types.ObjectId,
      required: [true, 'Batch id is required'],
      ref: 'Batch',
    },
    student: {
      type: Schema.Types.ObjectId,
      required: [true, 'Student id is required'],
      ref: 'Student',
    },
    isEliminated: Boolean,
    isCompleted: Boolean,
    elimination: {
      reason: String,
      message: String,
      eliminationDate: Date,
    },
    completionDate: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const BatchStudent = mongoose.model<TBatchStudent>(
  'BatchStudent',
  batchStudentSchema,
);
