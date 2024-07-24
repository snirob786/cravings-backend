/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { DeliveryStatus } from './delivery.constant';
import { TDelivery } from './delivery.interface';
import { Delivery } from './delivery.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createDeliveryIntoDB = async (payload: any) => {
  const userInfo = await Admin.isUserExists(payload.createdBy);

  const result = await Delivery.create(payload);
  return result;
};

const getAllDeliveriesFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    Delivery.find()
      .populate('deliveryAddress')
      .populate('pickUpAddress')
      .populate('order')
      .populate('canceledBy')
      .populate('deliveryMan')
      .populate('restaurant')
      .populate('createdBy'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleDeliveryFromDB = async (id: string) => {
  const result = await Delivery.findById(id)
    .populate('deliveryAddress')
    .populate('pickUpAddress')
    .populate('order')
    .populate('canceledBy')
    .populate('deliveryMan')
    .populate('restaurant')
    .populate('createdBy');

  return result;
};

const updateDeliveryIntoDB = async (
  id: string,
  payload: Partial<TDelivery>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isDeliveryExists = await Delivery.findById(id);

  if (!isDeliveryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This delivery is not found !');
  }

  const result = await Delivery.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteDeliveryFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isDeliveryExists = await Delivery.findById(id);

  if (!isDeliveryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This delivery is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedDelivery = await Delivery.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedDelivery) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete delivery!');
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

export const DeliveryService = {
  createDeliveryIntoDB,
  getAllDeliveriesFromDB,
  getSingleDeliveryFromDB,
  updateDeliveryIntoDB,
  deleteDeliveryFromDB,
};
