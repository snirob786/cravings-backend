/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PlatterStatus } from './platter.constant';
import { TPlatter } from './platter.interface';
import { Platter } from './platter.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createPlatterIntoDB = async (payload: any) => {
  try {
    const result = await Platter.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllPlattersFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      Platter.find()
        .populate('restaurant')
        .populate('category')
        .populate('subCategory')
        .populate('menuItem')
        .populate('specialMenu')
        .populate('order')
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

const getSinglePlatterFromDB = async (id: string) => {
  try {
    const result = await Platter.findById(id)
      .populate('restaurant')
      .populate('category')
      .populate('subCategory')
      .populate('menuItem')
      .populate('specialMenu')
      .populate('order')
      .populate('createdBy');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updatePlatterIntoDB = async (id: string, payload: Partial<TPlatter>) => {
  try {
    const isCategoryExists = await Platter.findById(id);

    if (!isCategoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This category is not found !');
    }

    const result = await Platter.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deletePlatterFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isCategoryExists = await Platter.findById(id);

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This category is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedCategory = await Platter.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedCategory) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete category!');
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

export const PlatterService = {
  createPlatterIntoDB,
  getAllPlattersFromDB,
  getSinglePlatterFromDB,
  updatePlatterIntoDB,
  deletePlatterFromDB,
};
