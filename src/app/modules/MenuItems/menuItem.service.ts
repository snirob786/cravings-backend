/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { MenuItemStatus } from './menuItem.constant';
import { TMenuItem } from './menuItem.interface';
import { MenuItem } from './menuItem.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createMenuItemIntoDB = async (payload: any) => {
  const userInfo = await Admin.isUserExists(payload.createdBy);

  const result = await MenuItem.create(payload);
  const updateAdmin = await Admin.updateOne(
    {
      _id: payload.owner,
    },
    {
      restaurant: result._id,
    },
  );

  return result;
};

const getAllMenuItemsFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    MenuItem.find()
      .populate('restaurant')
      .populate('subCategory')
      .populate('category')
      .populate('createdBy')
      .populate('variations'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  return result;
};

const getSingleMenuItemFromDB = async (id: string) => {
  const result = await MenuItem.findById(id)
    .populate('restaurant')
    .populate('subCategory')
    .populate('category')
    .populate('createdBy')
    .populate('variations');

  return result;
};

const updateMenuItemIntoDB = async (
  id: string,
  payload: Partial<TMenuItem>,
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
  const isMenuItemExists = await MenuItem.findById(id);

  if (!isMenuItemExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This menu item is not found !');
  }

  const result = await MenuItem.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteMenuItemFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isMenuItemExists = await MenuItem.findById(id);

  if (!isMenuItemExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This menu item is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedMenuItem) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete menu item!');
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
  createMenuItemIntoDB,
  getAllMenuItemsFromDB,
  getSingleMenuItemFromDB,
  updateMenuItemIntoDB,
  deleteMenuItemFromDB,
};
