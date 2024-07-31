/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TUserPackage } from './userPackage.interface';
import { UserPackage } from './userPackage.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createUserPackageIntoDB = async (payload: any) => {
  try {
    const result = await UserPackage.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllUserPackagesFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      UserPackage.find().populate({
        path: 'createdBy',
        model: 'User',
        populate: {
          path: 'superAdmin',
          model: 'SuperAdmin',
        },
      }),
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

const getSingleUserPackageFromDB = async (id: string) => {
  try {
    const result = await UserPackage.findById(id).populate({
      path: 'createdBy',
      model: 'User',
      populate: {
        path: 'superAdmin',
        model: 'SuperAdmin',
      },
    });

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateUserPackageIntoDB = async (
  id: string,
  payload: Partial<TUserPackage>,
) => {
  try {
    const result = await UserPackage.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteUserPackageFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedUserPackage = await UserPackage.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedUserPackage) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete user package!',
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

export const UserPackageService = {
  createUserPackageIntoDB,
  getAllUserPackagesFromDB,
  getSingleUserPackageFromDB,
  updateUserPackageIntoDB,
  deleteUserPackageFromDB,
};
