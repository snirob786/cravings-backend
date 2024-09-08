/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { NormalUserSearchableFields } from './normalUser.constant';
import { TNormalUser } from './normalUser.interface';
import { NormalUser } from './normalUser.model';

const getAllNormalUsersFromDB = async (query: Record<string, unknown>) => {
  const normalUserQuery = new QueryBuilder(
    NormalUser.find()
      .populate({
        path: 'restaurant',
        populate: {
          path: 'moderator',
          model: 'Moderator',
        },
      })
      .populate('user'),
    query,
  )

    .search(NormalUserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await normalUserQuery.modelQuery;
  return result;
};

const getSingleNormalUserFromDB = async (id: string) => {
  const result = await NormalUser.findById(id)
    .populate('restaurant')
    .populate('user')
    .populate('user')
  return result;
};

const updateNormalUserIntoDB = async (
  id: string,
  payload: Partial<TNormalUser>,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await NormalUser.findByIdAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteNormalUserFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedCustomer = await NormalUser.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Customer');
    }

    // get user _id from deletedAdmin
    const userId = deletedCustomer.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedCustomer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const NormalUserServices = {
  getAllNormalUsersFromDB,
  getSingleNormalUserFromDB,
  updateNormalUserIntoDB,
  deleteNormalUserFromDB,
};
