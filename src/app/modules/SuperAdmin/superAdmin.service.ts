/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { AdminSearchableFields } from './superAdmin.constant';
import { TSuperAdmin } from './superAdmin.interface';
import { SuperAdmin } from './superAdmin.model';

const getAllSuperAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(
    SuperAdmin.find()
      .populate('user')
      .populate('presentAddress')
      .populate('permanentAddress'),
    query,
  )
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleSuperAdminFromDB = async (id: string) => {
  console.log('🚀 ~ getSingleSuperAdminFromDB ~ id:', id);
  const result = await SuperAdmin.findById(id)
    .populate('user')
    .populate('presentAddress')
    .populate('permanentAddress');
  console.log('🚀 ~ getSingleSuperAdminFromDB ~ result:', result);
  return result;
};

const updateSuperAdminIntoDB = async (
  id: string,
  payload: Partial<TSuperAdmin>,
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

  const result = await SuperAdmin.findByIdAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteSuperAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedSuperAdmin = await SuperAdmin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedSuperAdmin) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete super admin',
      );
    }

    // get user _id from deletedAdmin
    const userId = deletedSuperAdmin.user;

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

    return deletedSuperAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const SuperAdminServices = {
  getAllSuperAdminsFromDB,
  getSingleSuperAdminFromDB,
  updateSuperAdminIntoDB,
  deleteSuperAdminFromDB,
};
