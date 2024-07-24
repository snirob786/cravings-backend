import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PlatterService } from './platter.service';

const createPlatter = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await PlatterService.createPlatterIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platter is created successfully!',
    data: result,
  });
});

const getAllPlatters = catchAsync(async (req: Request, res: Response) => {
  const result = await PlatterService.getAllPlattersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platter is retrieved successfully !',
    data: result,
  });
});

const getSinglePlatter = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PlatterService.getSinglePlatterFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platter is retrieved successfully',
    data: result,
  });
});

const updatePlatter = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlatterService.updatePlatterIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platter is updated successfully',
    data: result,
  });
});

const deletePlatter = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlatterService.deletePlatterFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Platter is deleted successfully',
    data: result,
  });
});

export const PlatterController = {
  createPlatter,
  getAllPlatters,
  getSinglePlatter,
  updatePlatter,
  deletePlatter,
};
