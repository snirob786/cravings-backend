import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserPackageService } from './userPackage.service';

const createUserPackage = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await UserPackageService.createUserPackageIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Package is created successfully!',
    data: result,
  });
});

const getAllUserPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await UserPackageService.getAllUserPackagesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Package is retrieved successfully !',
    data: result,
  });
});

const getSingleUserPackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserPackageService.getSingleUserPackageFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Package is retrieved successfully',
    data: result,
  });
});

const updateUserPackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserPackageService.updateUserPackageIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Package is updated successfully',
    data: result,
  });
});

const deleteUserPackage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserPackageService.deleteUserPackageFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Package is updated successfully',
    data: result,
  });
});

export const UserPackageController = {
  createUserPackage,
  getAllUserPackages,
  getSingleUserPackage,
  updateUserPackage,
  deleteUserPackage,
};
