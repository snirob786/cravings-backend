import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BatchService } from './batch.service';

const createBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchService.createBatchIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is created successfully!',
    data: result,
  });
});

const getAllBatches = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchService.getAllBatchesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is retrieved successfully !',
    data: result,
  });
});

const getSingleBatch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BatchService.getSingleBatchFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is retrieved successfully',
    data: result,
  });
});

const updateBatch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BatchService.updateBatchIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is updated successfully',
    data: result,
  });
});

const deleteBatch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BatchService.deleteBatchFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batch is updated successfully',
    data: result,
  });
});

export const BatchController = {
  createBatch,
  getAllBatches,
  getSingleBatch,
  updateBatch,
  deleteBatch,
};
