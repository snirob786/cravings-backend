/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BatchStatus } from './batch.constant';
import { TBatch } from './batch.interface';
import { Batch } from './batch.model';

const createBatchIntoDB = async (payload: TBatch) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingBatch = await Batch.findOne({
    $or: [{ status: BatchStatus.UPCOMING }, { status: BatchStatus.ONGOING }],
  });

  if (isThereAnyUpcomingOrOngoingBatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an batch named ${isThereAnyUpcomingOrOngoingBatch.status} registered!`,
    );
  }
  const result = await Batch.create(payload);
  return result;
};

const getAllBatchesFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(Batch.find().populate('course'), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleBatchFromDB = async (id: string) => {
  const result = await Batch.findById(id);

  return result;
};

const updateBatchIntoDB = async (id: string, payload: Partial<TBatch>) => {
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
  const isBatchExists = await Batch.findById(id);

  if (!isBatchExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isBatchExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === BatchStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === BatchStatus.UPCOMING &&
    requestedStatus === BatchStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === BatchStatus.ONGOING &&
    requestedStatus === BatchStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await Batch.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBatchFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isBatchExists = await Batch.findById(id);

  if (!isBatchExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This batch is not found !');
  }

  // checking if the status is still "UPCOMING"
  const batchStatus = isBatchExists.status;

  if (batchStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the batch is ${batchStatus}`,
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();
    const deletedBatch = await Batch.findByIdAndDelete(id, {
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

export const BatchService = {
  createBatchIntoDB,
  getAllBatchesFromDB,
  getSingleBatchFromDB,
  updateBatchIntoDB,
  deleteBatchFromDB,
};
