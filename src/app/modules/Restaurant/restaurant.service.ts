/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RestaurantStatus } from './restaurant.constant';
import { TRestaurant } from './restaurant.interface';
import { Restaurant } from './restaurant.model';

const createRestaurantIntoDB = async (payload: TRestaurant) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  // const isThereAnyUpcomingOrOngoingBatch = await Restaurant.findOne({
  //   $or: [
  //     { status: RestaurantStatus.active },
  //     { status: RestaurantStatus.ONGOING },
  //   ],
  // });

  // if (isThereAnyUpcomingOrOngoingBatch) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `There is aready an batch named ${isThereAnyUpcomingOrOngoingBatch.status} registered!`,
  //   );
  // }
  const result = await Restaurant.create(payload);
  return result;
};

const getAllRestaurantesFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    Restaurant.find().populate('course'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleRestaurantFromDB = async (id: string) => {
  const result = await Restaurant.findById(id);

  return result;
};

const updateRestaurantIntoDB = async (
  id: string,
  payload: Partial<TRestaurant>,
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
  const isRestaurantExists = await Restaurant.findById(id);

  if (!isRestaurantExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This restaurant is not found !');
  }

  const result = await Restaurant.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteRestaurantFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isRestaurantExists = await Restaurant.findById(id);

  if (!isRestaurantExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This batch is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedRestaurant) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete restaurant registration !',
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

export const RestaurantService = {
  createRestaurantIntoDB,
  getAllRestaurantesFromDB,
  getSingleRestaurantFromDB,
  updateRestaurantIntoDB,
  deleteRestaurantFromDB,
};
