/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TPaymentMethod } from './paymentMethod.interface';
import { PaymentMethod } from './paymentMethod.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createPaymentMethodIntoDB = async (payload: any) => {
  try {
    const result = await PaymentMethod.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllPaymentMethodsFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      PaymentMethod.find()
        .populate('restaurant')
        .populate('createdBy')
        .populate('order')
        .populate('paymentMethod'),
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

const getSinglePaymentMethodFromDB = async (id: string) => {
  try {
    const result = await PaymentMethod.findById(id)
      .populate('restaurant')
      .populate('createdBy')
      .populate('order')
      .populate('paymentMethod');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updatePaymentMethodIntoDB = async (
  id: string,
  payload: Partial<TPaymentMethod>,
) => {
  try {
    const result = await PaymentMethod.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deletePaymentMethodFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedPaymentMethod) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete payment method!',
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

export const PaymentMethodService = {
  createPaymentMethodIntoDB,
  getAllPaymentMethodsFromDB,
  getSinglePaymentMethodFromDB,
  updatePaymentMethodIntoDB,
  deletePaymentMethodFromDB,
};
