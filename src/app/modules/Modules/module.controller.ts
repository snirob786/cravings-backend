import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ModuleService } from './module.service';

const createModule = catchAsync(async (req: Request, res: Response) => {
  const result = await ModuleService.createModuleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module is created successfully!',
    data: result,
  });
});

const getAllModules = catchAsync(async (req: Request, res: Response) => {
  const result = await ModuleService.getAllModulesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module is retrieved successfully !',
    data: result,
  });
});

const getSingleModule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ModuleService.getSingleModuleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module is retrieved successfully',
    data: result,
  });
});

const updateModule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ModuleService.updateModuleIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module is updated successfully',
    data: result,
  });
});

const deleteModule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ModuleService.deleteModuleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Module is updated successfully',
    data: result,
  });
});

export const ModuleController = {
  createModule,
  getAllModules,
  getSingleModule,
  updateModule,
  deleteModule,
};
