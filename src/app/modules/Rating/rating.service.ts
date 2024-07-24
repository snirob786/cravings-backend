/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RatingStatus } from './rating.constant';
import { TRating } from './rating.interface';
import { Rating } from './rating.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createRatingIntoDB = async (payload: any) => {
  try {
    const result = await Rating.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllRatingsFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      Rating.find()
        .populate('menuItem')
        .populate('category')
        .populate('subCategory')
        .populate('platter')
        .populate('specialMenu')
        .populate('restaurant')
        .populate('createdBy'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await batchQuery.modelQuery;
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getSingleRatingFromDB = async (id: string) => {
  try {
    const result = await Rating.findById(id)
      .populate('menuItem')
      .populate('category')
      .populate('subCategory')
      .populate('platter')
      .populate('specialMenu')
      .populate('restaurant')
      .populate('createdBy');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateRatingIntoDB = async (id: string, payload: Partial<TRating>) => {
  try {
    const result = await Rating.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteRatingFromDB = async (id: string) => {
  const isAddressExists = await Rating.findById(id);

  if (!isAddressExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This address is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedAddress = await Rating.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedAddress) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete address!');
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const RatingService = {
  createRatingIntoDB,
  getAllRatingsFromDB,
  getSingleRatingFromDB,
  updateRatingIntoDB,
  deleteRatingFromDB,
};
