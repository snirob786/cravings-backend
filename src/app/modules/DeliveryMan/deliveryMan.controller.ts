import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DeliveryManServices } from './deliveryMan.service';

const getSingleDeliveryMan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DeliveryManServices.getSingleDeliveryManFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery Man is retrieved succesfully',
    data: result,
  });
});

const getAllDeliveryMans: RequestHandler = catchAsync(async (req, res) => {
  const result = await DeliveryManServices.getAllDeliveryMansFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery Man are retrieved succesfully',
    data: result,
  });
});

const updateDeliveryMan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { deliveryMan } = req.body;
  const result = await DeliveryManServices.updateDeliveryManIntoDB(
    id,
    deliveryMan,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery Man is updated succesfully',
    data: result,
  });
});

const deleteDeliveryMan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DeliveryManServices.deleteDeliveryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delivery Man is deleted succesfully',
    data: result,
  });
});

export const DeliveryManControllers = {
  getAllDeliveryMans,
  getSingleDeliveryMan,
  deleteDeliveryMan,
  updateDeliveryMan,
};
