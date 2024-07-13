/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result: any = await AuthServices.loginUser(req.body);
  const { user, refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: {
      user: user,
      token: accessToken,
    },
  });
});

// const changePassword = catchAsync(async (req: any, res) => {
//   const { currentPassword, newPassword } = req.body;

//   const result = await AuthServices.changePassword(req.user, {
//     newPassword,
//     currentPassword,
//   });
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password is updated succesfully!',
//     data: result,
//   });
// });

export const AuthControllers = {
  registerUser,
  loginUser,
  // changePassword,
};
