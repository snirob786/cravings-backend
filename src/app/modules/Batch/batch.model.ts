import mongoose, { Schema } from 'mongoose';
import { BatchRegistrationStatus } from './batch.constant';
import { TBatch } from './batch.interface';
import { Course } from '../Course/course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Mentor } from '../Mentor/mentor.model';

const batchSchema = new mongoose.Schema<TBatch>(
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
    status: {
      type: String,
      enum: BatchRegistrationStatus,
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
      ref: 'Mentor',
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

batchSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const batch = this; // doc
  // hashing password and save into DB

  const course = await Course.findById(batch.course);
  if (!course) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This course with id ${batch.course} is not found!`,
    );
  }
  const mentor = await Mentor.findById(batch.mentor);
  if (!mentor) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This mentor with id ${batch.mentor} is not found!`,
    );
  }

  next();
});

export const Batch = mongoose.model<TBatch>('Batch', batchSchema);
