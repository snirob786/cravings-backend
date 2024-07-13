import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassService } from './class.service';

const createClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.createClassIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class is created successfully!',
    data: result,
  });
});

const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.getAllClassesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class is retrieved successfully !',
    data: result,
  });
});

const getSingleClass = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ClassService.getSingleClassFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class is retrieved successfully',
    data: result,
  });
});

const updateClass = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassService.updateClassIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class is updated successfully',
    data: result,
  });
});

const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassService.deleteClassFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class is updated successfully',
    data: result,
  });
});

export const ClassController = {
  createClass,
  getAllClasses,
  getSingleClass,
  updateClass,
  deleteClass,
};
