/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ModeratorSearchableFields } from './moderator.constant';
import { TModerator } from './moderator.interface';
import { Moderator } from './moderator.model';

const getAllModeratorsFromDB = async (query: Record<string, unknown>) => {
  const moderatorQuery = new QueryBuilder(
    Moderator.find()
      .populate('restaurant')
      .populate('user')
      .populate('presentAddress')
      .populate('permanentAddress'),
    query,
  )
    .search(ModeratorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await moderatorQuery.modelQuery;
  return result;
};

const getSingleModeratorFromDB = async (id: string) => {
  const result = await Moderator.findById(id)
    .populate('restaurant')
    .populate('user')
    .populate('presentAddress')
    .populate('permanentAddress');

  return result;
};

const updateModeratorIntoDB = async (
  id: string,
  payload: Partial<TModerator>,
) => {
  const { name, ...remainingModeratorData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingModeratorData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Moderator.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteModeratorFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedModerator = await Moderator.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedModerator) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete moderator');
    }

    // get user _id from deletedFaculty
    const userId = deletedModerator.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedModerator;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const ModeratorServices = {
  getAllModeratorsFromDB,
  getSingleModeratorFromDB,
  updateModeratorIntoDB,
  deleteModeratorFromDB,
};
