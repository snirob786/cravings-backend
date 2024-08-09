import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NormalUserServices } from './normalUser.service';

const getSingleNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NormalUserServices.getSingleNormalUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getAllNormalUsers = catchAsync(async (req, res) => {
  const result = await NormalUserServices.getAllNormalUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  });
});

const updateNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await NormalUserServices.updateNormalUserIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});

const deleteNormalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NormalUserServices.deleteNormalUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted succesfully',
    data: result,
  });
});

export const NormalUserControllers = {
  getAllNormalUsers,
  getSingleNormalUser,
  deleteNormalUser,
  updateNormalUser,
};
