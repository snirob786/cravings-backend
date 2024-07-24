/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { CustomerSearchableFields } from './customer.constant';
import { TCustomer } from './customer.interface';
import { Customer } from './customer.model';

const getAllCustomersFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(
    Customer.find()
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

    .search(CustomerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleCustomerFromDB = async (id: string) => {
  const result = await Customer.findById(id)
    .populate('restaurant')
    .populate('user');
  return result;
};

const updateCustomerIntoDB = async (
  id: string,
  payload: Partial<TCustomer>,
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

  const result = await Customer.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCustomerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedCustomer = await Customer.findByIdAndUpdate(
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

export const CustomerServices = {
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
  updateCustomerIntoDB,
  deleteCustomerFromDB,
};
