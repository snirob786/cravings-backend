/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { VariationStatus } from './variation.constant';
import { TVariation } from './variation.interface';
import { Variation } from './variation.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';
import { Category } from '../Category/category.model';

const createVariationIntoDB = async (payload: any) => {
  const userInfo = await Admin.isUserExists(payload.createdBy);

  const result = await Variation.create(payload);

  const getCategoryInfo = await Category.findById(payload.category);
  console.log('getCategoryInfo: ', getCategoryInfo);
  const newCategorySubCategory: any = getCategoryInfo?.subCategory || [];
  newCategorySubCategory.push(result._id);

  const updateAdmin = await Admin.updateOne(
    {
      _id: payload.owner,
    },
    {
      restaurant: result._id,
    },
  );
  const updateCategory = await Category.updateOne(
    {
      _id: payload.category,
    },
    {
      subCategory: newCategorySubCategory,
    },
  );

  console.log('updateCategory: ', updateCategory);

  return result;
};

const getAllVariationsFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    Variation.find().populate('createdBy').populate('menuItem'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleVariationFromDB = async (id: string) => {
  const result = await Variation.findById(id)
    .populate('menuItem')
    .populate('createdBy');

  return result;
};

const updateSVariationIntoDB = async (
  id: string,
  payload: Partial<TVariation>,
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
  const isVariationExists = await Variation.findById(id);

  if (!isVariationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This variation is not found !');
  }

  const result = await Variation.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteVariationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isVariationExists = await Variation.findById(id);

  if (!isVariationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This variation is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedVariation = await Variation.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedVariation) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete variation registration !',
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

export const VariationService = {
  createVariationIntoDB,
  getAllVariationsFromDB,
  getSingleVariationFromDB,
  updateSVariationIntoDB,
  deleteVariationFromDB,
};
