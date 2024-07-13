import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MentorServices } from './mentor.service';

const getSingleMentor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MentorServices.getSingleMentorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentor is retrieved succesfully',
    data: result,
  });
});

const getAllMentors = catchAsync(async (req, res) => {
  const result = await MentorServices.getAllMentorsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentors are retrieved succesfully',
    data: result,
  });
});

const updateMentor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await MentorServices.updateMentorIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentor is updated succesfully',
    data: result,
  });
});

const deleteMentor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MentorServices.deleteMentorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mentor is deleted succesfully',
    data: result,
  });
});

export const MentorControllers = {
  getAllMentors,
  getSingleMentor,
  updateMentor,
  deleteMentor,
};
