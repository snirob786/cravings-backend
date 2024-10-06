/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RestaurantStatus } from './restaurant.constant';
import { TRestaurant } from './restaurant.interface';
import { Restaurant } from './restaurant.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createRestaurantIntoDB = async (payload: any) => {
  const userInfo = await Admin.isUserExists(payload.createdBy);

  const result = await Restaurant.create(payload);
  const updateAdmin = await Admin.updateOne(
    {
      _id: payload.owner,
    },
    {
      restaurant: result._id,
    },
  );

  return result;
};

const getAllRestaurantesFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    Restaurant.find()
      .populate('createdBy')
      .populate('owner')
      .populate('address')
      .populate('pickUpAddress')
      .populate('order')
      .populate('moderator'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleRestaurantFromDB = async (id: string) => {
  const result = await Restaurant.findById(id)
    .populate('createdBy')
    .populate('owner')
    .populate('adderss')
    .populate('pickUpAddress')
    .populate('order')
    .populate('moderator');

  return result;
};

const updateRestaurantIntoDB = async (
  id: string,
  payload: Partial<TRestaurant>,
) => {
  const isRestaurantExists = await Restaurant.findById(id);

  if (!isRestaurantExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This restaurant is not found !');
  }

  const result = await Restaurant.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteRestaurantFromDB = async (id: string) => {
  const isRestaurantExists = await Restaurant.findById(id);

  if (!isRestaurantExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This batch is not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedRestaurant) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete restaurant!',
      );
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

export const RestaurantService = {
  createRestaurantIntoDB,
  getAllRestaurantesFromDB,
  getSingleRestaurantFromDB,
  updateRestaurantIntoDB,
  deleteRestaurantFromDB,
};
