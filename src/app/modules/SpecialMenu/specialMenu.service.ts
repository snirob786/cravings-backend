/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { SpecialMenuStatus } from './specialMenu.constant';
import { TSpecialMenu } from './specialMenu.interface';
import { SpecialMenu } from './specialMenu.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createSpecialMenuIntoDB = async (payload: any) => {
  const result = await SpecialMenu.create(payload);
  return result;
};

const getAllSpecialMenusFromDB = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(
    SpecialMenu.find()
      .populate('restaurant')
      .populate('menuItem')
      .populate('createdBy'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await batchQuery.modelQuery;
  console.log('get all special menus result: ', result);
  return result;
};

const getSingleSpecialMenuFromDB = async (id: string) => {
  const result = await SpecialMenu.findById(id)
    .populate('restaurant')
    .populate('menuItem')
    .populate('createdBy');

  return result;
};

const updateSpecialMenuIntoDB = async (
  id: string,
  payload: Partial<TSpecialMenu>,
) => {
  console.log('🚀 ~ payload:', payload);
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
  const isSpecialMenuExists = await SpecialMenu.findById(id);

  if (!isSpecialMenuExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This special menu is not found !',
    );
  }
  let newMenutItems: any = isSpecialMenuExists.menuItem || [];
  newMenutItems = newMenutItems.concat(payload.menuItem);
  console.log('newMenutItems: ', newMenutItems);

  const result = await SpecialMenu.findByIdAndUpdate(id, payload);
  console.log('update value result: ', result);

  return result;
};

const deleteSpecialMenuFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isCategoryExists = await SpecialMenu.findById(id);

  if (!isCategoryExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This special menu is not found !',
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedSpecialMenu = await SpecialMenu.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedSpecialMenu) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete special menu!',
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

export const SpecialMenuService = {
  createSpecialMenuIntoDB,
  getAllSpecialMenusFromDB,
  getSingleSpecialMenuFromDB,
  updateSpecialMenuIntoDB,
  deleteSpecialMenuFromDB,
};
