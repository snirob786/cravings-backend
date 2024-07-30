import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NormalUserServices } from './normalUser.service';

const getSingleNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NormalUserServices.getSingleCustomerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is retrieved succesfully',
    data: result,
  });
});

const getAllNormalUsers = catchAsync(async (req, res) => {
  const result = await NormalUserServices.getAllCustomersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers are retrieved succesfully',
    data: result,
  });
});

const updateNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await NormalUserServices.updateCustomerIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is updated succesfully',
    data: result,
  });
});

const deleteNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NormalUserServices.deleteCustomerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is deleted succesfully',
    data: result,
  });
});

export const NormalUserControllers = {
  getAllNormalUsers,
  getSingleNormalUser,
  deleteNormalUser,
  updateNormalUser,
};
