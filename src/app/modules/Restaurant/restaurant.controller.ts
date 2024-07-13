import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RestaurantService } from './restaurant.service';

const createRestaurant = catchAsync(async (req: Request, res: Response) => {
  console.log('restaurant req in controller: ', req.user._id);
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await RestaurantService.createRestaurantIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Restaurant is created successfully!',
    data: result,
  });
});

const getAllRestaurants = catchAsync(async (req: Request, res: Response) => {
  const result = await RestaurantService.getAllRestaurantesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Restaurant is retrieved successfully !',
    data: result,
  });
});

const getSingleRestaurant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await RestaurantService.getSingleRestaurantFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Restaurant is retrieved successfully',
    data: result,
  });
});

const updateRestaurant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RestaurantService.updateRestaurantIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Restaurant is updated successfully',
    data: result,
  });
});

const deleteRestaurant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RestaurantService.deleteRestaurantFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Restaurant is updated successfully',
    data: result,
  });
});

export const RestaurantController = {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
