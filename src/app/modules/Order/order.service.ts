/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { OrderStatus } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createOrderIntoDB = async (payload: any) => {
  try {
    const result = await Order.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      Order.find()
        .populate('restaurant')
        .populate('item')
        .populate('category')
        .populate('subCategory')
        .populate('specialMenu')
        .populate('user')
        .populate('moderator')
        .populate('deliveryMan')
        .populate('pickUpAddress')
        .populate('deliveryAddress')
        .populate('paymentDetail')
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

const getSingleOrderFromDB = async (id: string) => {
  try {
    const result = await Order.findById(id)
      .populate('restaurant')
      .populate('item')
      .populate('category')
      .populate('subCategory')
      .populate('specialMenu')
      .populate('admin')
      .populate('superAdmin')
      .populate('moderator')
      .populate('deliveryMan')
      .populate('pickUpAddress')
      .populate('deliveryAddress')
      .populate('paymentDetail')
      .populate('createdBy');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  try {
    const result = await Order.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteOrderFromDB = async (id: string) => {
  // const isCategoryExists = await Order.findById(id);

  // if (!isCategoryExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This order is not found !');
  // }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedCategory = await Order.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedCategory) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order!');
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

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
