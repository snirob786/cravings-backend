import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReportService } from './report.service';

const createReport = catchAsync(async (req: Request, res: Response) => {
  let newPayload = {
    ...req.body,
    createdBy: req.user._id,
  };
  const result = await ReportService.createReportIntoDB(newPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report is created successfully!',
    data: result,
  });
});

const getAllReport = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.getAllReportsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report is retrieved successfully !',
    data: result,
  });
});

const getSingleReport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ReportService.getSingleReportFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report is retrieved successfully',
    data: result,
  });
});

const updateReport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReportService.updateReportIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report is updated successfully',
    data: result,
  });
});

const deleteReport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReportService.deleteReportFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report is deleted successfully',
    data: result,
  });
});

export const ReportController = {
  createReport,
  getAllReport,
  getSingleReport,
  updateReport,
  deleteReport,
};
