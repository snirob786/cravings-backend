import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await PaymentService.createPaymentIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is created successfully!',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPaymentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is retrieved successfully !',
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PaymentService.getSinglePaymentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is retrieved successfully',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.updatePaymentIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is updated successfully',
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.deletePaymentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment is updated successfully',
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
