import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ModeratorServices } from './moderator.service';

const getSingleModerator = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ModeratorServices.getSingleModeratorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentor is retrieved succesfully',
    data: result,
  });
});

const getAllModerators = catchAsync(async (req, res) => {
  const result = await ModeratorServices.getAllModeratorsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentors are retrieved succesfully',
    data: result,
  });
});

const updateModerator = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await ModeratorServices.updateModeratorIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentor is updated succesfully',
    data: result,
  });
});

const deleteModerator = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ModeratorServices.deleteModeratorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentor is deleted succesfully',
    data: result,
  });
});

export const MentorControllers = {
  getAllModerators,
  getSingleModerator,
  updateModerator,
  deleteModerator,
};
