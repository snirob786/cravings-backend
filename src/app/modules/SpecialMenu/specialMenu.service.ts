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
  try {
    const result = await SpecialMenu.create(payload);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllSpecialMenusFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      SpecialMenu.find()
        .populate('restaurant')
        .populate({
          path: 'platter',
          populate: {
            path: 'menuItem',
            model: 'MenuItem',
          },
        })
        .populate('menuItem')
        .populate('createdBy')
        .populate('order'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await batchQuery.modelQuery;
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSingleSpecialMenuFromDB = async (id: string) => {
  try {
    const result = await SpecialMenu.findById(id)
      .populate('restaurant')
      .populate({
        path: 'platter',
        populate: {
          path: 'menuItem',
          model: 'MenuItem',
        },
      })
      .populate('menuItem')
      .populate('createdBy')
      .populate('order');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateSpecialMenuIntoDB = async (
  id: string,
  payload: Partial<TSpecialMenu>,
) => {
  try {
    const isSpecialMenuExists = await SpecialMenu.findById(id);

    if (!isSpecialMenuExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This special menu is not found !',
      );
    }
    let newMenutItems: any = isSpecialMenuExists.menuItem || [];
    newMenutItems = newMenutItems.concat(payload.menuItem);

    const result = await SpecialMenu.findByIdAndUpdate(id, payload);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteSpecialMenuFromDB = async (id: string) => {
  const isSpecialMenuExists = await SpecialMenu.findById(id);

  if (!isSpecialMenuExists) {
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
