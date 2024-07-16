/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CategoryStatus } from './category.constant';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createCategoryIntoDB = async (payload: any) => {
  const userInfo = await Admin.isUserExists(payload.createdBy);

  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    Category.find()
      .populate('restaurant')
      .populate({
        path: 'subCategory',
        populate: {
          path: 'menuItem',
          model: 'MenuItem',
        },
      })
      .populate('menuItem')
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

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id)
    .populate('restaurant')
    .populate({
      path: 'subCategory',
      populate: {
        path: 'menuItem',
        model: 'MenuItem',
      },
    })
    .populate('menuItem')
    .populate('createdBy');

  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
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
  const isCategoryExists = await Category.findById(id);

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This category is not found !');
  }

  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isCategoryExists = await Category.findById(id);

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This category is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedCategory) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete category!');
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

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
