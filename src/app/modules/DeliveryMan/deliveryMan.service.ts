import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { deliveryManSearchableFields } from './deliveryMan.constant';
import { TDeliveryMan } from './deliveryMan.interface';
import { DeliveryMan } from './deliveryMan.model';

const getAllDeliveryMansFromDB = async (query: Record<string, unknown>) => {
  try {
    const deliveryManQuery = new QueryBuilder(
      DeliveryMan.find()
        .populate('user')
        .populate('presentAddress')
        .populate('permanentAddress')
        .populate('order')
        .populate('order')
        .populate('restaurant'),
      query,
    )
      .search(deliveryManSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await deliveryManQuery.modelQuery;
    const totalDeliveryMan = await deliveryManQuery.countTotal();

    return {
      result,
      total: totalDeliveryMan,
    };
  } catch (error: any) {
    console.log('get all error: ', error);
    throw new Error(error);
  }
};

const getSingleDeliveryManFromDB = async (id: string) => {
  const result = await DeliveryMan.findById(id)
    .populate('user')
    .populate('presentAddress')
    .populate('permanentAddress')
    .populate('order')
    .populate('order')
    .populate('restaurant');
  return result;
};

const updateDeliveryManIntoDB = async (
  id: string,
  payload: Partial<TDeliveryMan>,
) => {
  const { name, vehicle, ...remainingDeliveryManData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingDeliveryManData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (vehicle && Object.keys(vehicle).length) {
    for (const [key, value] of Object.entries(vehicle)) {
      modifiedUpdatedData[`vehicle.${key}`] = value;
    }
  }

  const result = await DeliveryMan.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteDeliveryFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedDeliveryMan = await DeliveryMan.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedDeliveryMan) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete delivery man',
      );
    }

    // get user _id from deletedStudent
    const userId = deletedDeliveryMan.user;

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

    return deletedDeliveryMan;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete delivery man');
  }
};

export const DeliveryManServices = {
  getAllDeliveryMansFromDB,
  getSingleDeliveryManFromDB,
  updateDeliveryManIntoDB,
  deleteDeliveryFromDB,
};
