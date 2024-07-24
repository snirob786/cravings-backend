import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await OrderService.createOrderIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved successfully !',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OrderService.getSingleOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.updateOrderIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is updated successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
