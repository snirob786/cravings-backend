import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VariationService } from './variation.service';

const createVariation = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await VariationService.createVariationIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variation is created successfully!',
    data: result,
  });
});

const getAllVariations = catchAsync(async (req: Request, res: Response) => {
  const result = await VariationService.getAllVariationsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variation is retrieved successfully !',
    data: result,
  });
});

const getSingleVariation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VariationService.getSingleVariationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variation is retrieved successfully',
    data: result,
  });
});

const updateVariation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VariationService.updateSVariationIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variation is updated successfully',
    data: result,
  });
});

const deleteVariation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VariationService.deleteVariationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variation is deleted successfully',
    data: result,
  });
});

export const VariationController = {
  createVariation,
  getAllVariations,
  getSingleVariation,
  updateVariation,
  deleteVariation,
};
