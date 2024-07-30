import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// const createDeliveryMan = catchAsync(async (req, res) => {
//   const { password, deliveryMan: deliveryManData } = req.body;

//   const result = await UserServices.createDeliveryManIntoDB(
//     req.file,
//     password,
//     deliveryManData,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Delivery Man is created succesfully',
//     data: result,
//   });
// });

// const createModerator = catchAsync(async (req, res) => {
//   const { password, moderator: moderatorData } = req.body;

//   const result = await UserServices.createModeratorIntoDB(
//     req.file,
//     password,
//     moderatorData,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Moderator is created succesfully',
//     data: result,
//   });
// });

// const createNormalUser = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body;

//   const result = await UserServices.createNormalUserIntoDB(
//     req.file,
//     password,
//     adminData,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created succesfully',
//     data: result,
//   });
// });
const createSuperAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createSuperAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admin is created succesfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found !');
  // }

  const { id } = req.query;

  const result = await UserServices.getSingleUser(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
export const UserControllers = {
  // createDeliveryMan,
  // createModerator,
  // createNormalUser,
  createSuperAdmin,
  getSingleUser,
  changeStatus,
};
