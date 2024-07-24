import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentMethodService } from './paymentMethod.service';

const createPaymentMethod = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result =
    await PaymentMethodService.createPaymentMethodIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment method is created successfully!',
    data: result,
  });
});

const getAllPaymentMethods = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentMethodService.getAllPaymentMethodsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment method is retrieved successfully !',
    data: result,
  });
});

const getSinglePaymentMethod = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await PaymentMethodService.getSinglePaymentMethodFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment method is retrieved successfully',
      data: result,
    });
  },
);

const updatePaymentMethod = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentMethodService.updatePaymentMethodIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment method is updated successfully',
    data: result,
  });
});

const deletePaymentMethod = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentMethodService.deletePaymentMethodFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment method is deleted successfully',
    data: result,
  });
});

export const PaymentMethodController = {
  createPaymentMethod,
  getAllPaymentMethods,
  getSinglePaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
