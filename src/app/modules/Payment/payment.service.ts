/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PaymentStatus } from './payment.constant';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createPaymentIntoDB = async (payload: any) => {
  try {
    const result = await Payment.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllPaymentsFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      Payment.find()
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

const getSinglePaymentFromDB = async (id: string) => {
  try {
    const result = await Payment.findById(id)
      .populate('restaurant')
      .populate('createdBy')
      .populate('order')
      .populate('paymentMethod');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updatePaymentIntoDB = async (id: string, payload: Partial<TPayment>) => {
  try {
    const result = await Payment.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deletePaymentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedPayment = await Payment.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedPayment) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete payment!');
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

export const PaymentService = {
  createPaymentIntoDB,
  getAllPaymentsFromDB,
  getSinglePaymentFromDB,
  updatePaymentIntoDB,
  deletePaymentFromDB,
};
