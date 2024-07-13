import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SuperAdminServices } from './superAdmin.service';

const getSingleSuperAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SuperAdminServices.getSingleSuperAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  });
});

const getAllSupperAdmins = catchAsync(async (req, res) => {
  const result = await SuperAdminServices.getAllSuperAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admins are retrieved succesfully',
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await SuperAdminServices.updateSuperAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  });
});

const deleteSuperAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SuperAdminServices.deleteSuperAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  });
});

export const SuperAdminControllers = {
  getAllSupperAdmins,
  getSingleSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
};
