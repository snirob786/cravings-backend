import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RatingService } from './rating.service';

const createRating = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await RatingService.createRatingIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating is created successfully!',
    data: result,
  });
});

const getAllRatings = catchAsync(async (req: Request, res: Response) => {
  const result = await RatingService.getAllRatingsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating is retrieved successfully !',
    data: result,
  });
});

const getSingleRating = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await RatingService.getSingleRatingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating is retrieved successfully',
    data: result,
  });
});

const updateRating = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RatingService.updateRatingIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating is updated successfully',
    data: result,
  });
});

const deleteRating = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RatingService.deleteRatingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating is deleted successfully',
    data: result,
  });
});

export const RatingController = {
  createRating,
  getAllRatings,
  getSingleRating,
  updateRating,
  deleteRating,
};
