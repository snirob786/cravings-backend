import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SpecialMenuService } from './specialMenu.service';

const createSpecialMenu = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await SpecialMenuService.createSpecialMenuIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special Menu is created successfully!',
    data: result,
  });
});

const getAllSpecialMenus = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialMenuService.getAllSpecialMenusFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special Menu is retrieved successfully !',
    data: result,
  });
});

const getSingleSpecialMenu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SpecialMenuService.getSingleSpecialMenuFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special Menu is retrieved successfully',
    data: result,
  });
});

const updateSpecialMenu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialMenuService.updateSpecialMenuIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special Menu is updated successfully',
    data: result,
  });
});

const deleteSpecialMenu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialMenuService.deleteSpecialMenuFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Special Menu is deleted successfully',
    data: result,
  });
});

export const SpecialMenuController = {
  createSpecialMenu,
  getAllSpecialMenus,
  getSingleSpecialMenu,
  updateSpecialMenu,
  deleteSpecialMenu,
};
