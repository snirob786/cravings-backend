/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { SubCategoryStatus } from './subCategory.constant';
import { TSubCategory } from './subCategory.interface';
import { SubCategory } from './subCategory.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';
import { Category } from '../Category/category.model';

const createSubCategoryIntoDB = async (payload: any) => {
  const userInfo = await Admin.isUserExists(payload.createdBy);

  const result = await SubCategory.create(payload);

  const getCategoryInfo = await Category.findById(payload.category);
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

  return result;
};

const getAllSubCategoriesFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    SubCategory.find()
      .populate('restaurant')
      .populate('category')
      .populate('order')
      .populate('createdBy')
      .populate('menuItem'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleSubCategoryFromDB = async (id: string) => {
  const result = await SubCategory.findById(id)
    .populate('restaurant')
    .populate('category')
    .populate('order')
    .populate('createdBy')
    .populate('menuItem');

  return result;
};

const updateSubCategoryIntoDB = async (
  id: string,
  payload: Partial<TSubCategory>,
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
  const isSubCategoryExists = await SubCategory.findById(id);

  if (!isSubCategoryExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This sub category is not found !',
    );
  }

  const result = await SubCategory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSubCategoryFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSubCategoryExists = await SubCategory.findById(id);

  if (!isSubCategoryExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This sub category is not found !',
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedSubCategory) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete sub category registration !',
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

export const SubCategoryService = {
  createSubCategoryIntoDB,
  getAllSubCategoriesFromDB,
  getSingleSubCategoryFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryFromDB,
};
