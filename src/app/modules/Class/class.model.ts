import mongoose, { Schema } from 'mongoose';
import { TClass } from './class.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Module } from '../Modules/module.model';

const classSchema = new mongoose.Schema<TClass>(
  {
    title: {
      type: String,
      required: [true, 'Batch title is required'],
    },
    videoUrl: String,
    videoDuration: String,
    content: String,
    releaseDate: Date,
    module: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
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

classSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const classData = this; // doc
  // hashing password and save into DB

  const result = await Module.findById(classData.module);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This module with id ${classData.module} is not found!`,
    );
  }

  next();
});

export const Class = mongoose.model<TClass>('Class', classSchema);
