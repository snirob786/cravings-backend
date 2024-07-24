/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AddressStatus } from './address.constant';
import { TAddress } from './address.interface';
import { Address } from './address.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createAddressIntoDB = async (payload: any) => {
  try {
    const result = await Address.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllAddressesFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      Address.find()
        .populate('restaurant')
        .populate('city')
        .populate('district')
        .populate('country')
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

const getSingleAddressFromDB = async (id: string) => {
  try {
    const result = await Address.findById(id)
      .populate('restaurant')
      .populate('city')
      .populate('district')
      .populate('country')
      .populate('createdBy');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateAddressIntoDB = async (id: string, payload: Partial<TAddress>) => {
  try {
    const result = await Address.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteAddressFromDB = async (id: string) => {
  const isAddressExists = await Address.findById(id);

  if (!isAddressExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This address is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedAddress = await Address.findByIdAndUpdate(
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

export const AddressService = {
  createAddressIntoDB,
  getAllAddressesFromDB,
  getSingleAddressFromDB,
  updateAddressIntoDB,
  deleteAddressFromDB,
};
