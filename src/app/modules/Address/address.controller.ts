import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AddressService } from './address.service';

const createAddress = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await AddressService.createAddressIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address is created successfully!',
    data: result,
  });
});

const getAllAddresses = catchAsync(async (req: Request, res: Response) => {
  const result = await AddressService.getAllAddressesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address is retrieved successfully !',
    data: result,
  });
});

const getSingleAddress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AddressService.getSingleAddressFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address is retrieved successfully',
    data: result,
  });
});

const updateAddress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AddressService.updateAddressIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address is updated successfully',
    data: result,
  });
});

const deleteAddress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AddressService.deleteAddressFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address is updated successfully',
    data: result,
  });
});

export const AddressController = {
  createAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress,
};
