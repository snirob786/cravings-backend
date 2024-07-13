/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TClass } from './class.interface';
import { Class } from './class.model';

const createClassIntoDB = async (payload: TClass) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const result = await Class.create(payload);
  return result;
};

const getAllClassesFromDB = async (query: Record<string, unknown>) => {
  const classQuery = new QueryBuilder(
    Class.find().populate('module').populate('createdBy'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await classQuery.modelQuery;
  return result;
};

const getSingleClassFromDB = async (id: string) => {
  const result = await Class.findById(id);

  return result;
};

const updateClassIntoDB = async (id: string, payload: Partial<TClass>) => {
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
  const isClassExists = await Class.findById(id);

  if (!isClassExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This class is not found !');
  }

  const result = await Class.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteClassFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isClassExists = await Class.findById(id);

  if (!isClassExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This batch is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();
    const deletedBatch = await Class.findByIdAndDelete(id, {
      session,
      new: true,
    });

    if (!deletedBatch) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
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

export const ClassService = {
  createClassIntoDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  updateClassIntoDB,
  deleteClassFromDB,
};
