import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DeliveryService } from './delivery.service';

const createDelivery = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await DeliveryService.createDeliveryIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery is created successfully!',
    data: result,
  });
});

const getAllDeliveries = catchAsync(async (req: Request, res: Response) => {
  const result = await DeliveryService.getAllDeliveriesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery is retrieved successfully !',
    data: result,
  });
});

const getSingleDelivery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DeliveryService.getSingleDeliveryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery is retrieved successfully',
    data: result,
  });
});

const updateDelivery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DeliveryService.updateDeliveryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery is updated successfully',
    data: result,
  });
});

const deleteDelivery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DeliveryService.deleteDeliveryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery is updated successfully',
    data: result,
  });
});

export const DeliveryController = {
  createDelivery,
  getAllDeliveries,
  getSingleDelivery,
  updateDelivery,
  deleteDelivery,
};
