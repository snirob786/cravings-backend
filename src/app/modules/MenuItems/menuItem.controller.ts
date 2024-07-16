import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryService } from './menuItem.service';

const createMenuItem = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await CategoryService.createMenuItemIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Menu Item is created successfully!',
    data: result,
  });
});

const getAllMenuItems = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllMenuItemsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Menu Item is retrieved successfully !',
    data: result,
  });
});

const getSingleMenuItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CategoryService.getSingleMenuItemFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Menu Item is retrieved successfully',
    data: result,
  });
});

const updateMenuItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.updateMenuItemIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Menu Item is updated successfully',
    data: result,
  });
});

const deleteMenuItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteMenuItemFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Menu Item is updated successfully',
    data: result,
  });
});

export const MenuItemController = {
  createMenuItem,
  getAllMenuItems,
  getSingleMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
