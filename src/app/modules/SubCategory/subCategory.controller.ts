import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubCategoryService } from './subCategory.service';

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await SubCategoryService.createSubCategoryIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is created successfully!',
    data: result,
  });
});

const getAllSubCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryService.getAllSubCategoriesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is retrieved successfully !',
    data: result,
  });
});

const getSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SubCategoryService.getSingleSubCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is retrieved successfully',
    data: result,
  });
});

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubCategoryService.updateSubCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is updated successfully',
    data: result,
  });
});

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubCategoryService.deleteSubCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is deleted successfully',
    data: result,
  });
});

export const SubCategoryController = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
