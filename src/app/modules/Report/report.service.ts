/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ReportStatus } from './report.constant';
import { TReport } from './report.interface';
import { Report } from './report.model';
import { Admin } from '../Admin/admin.model';
import { User } from '../user/user.model';

const createReportIntoDB = async (payload: any) => {
  try {
    const result = await Report.create(payload);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllReportsFromDB = async (query: Record<string, unknown>) => {
  try {
    const batchQuery = new QueryBuilder(
      Report.find().populate('reportFrom').populate('reportAbout'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await batchQuery.modelQuery;
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getSingleReportFromDB = async (id: string) => {
  try {
    const result = await Report.findById(id)
      .populate('reportFrom')
      .populate('reportAbout');

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateReportIntoDB = async (id: string, payload: Partial<TReport>) => {
  try {
    const result = await Report.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteReportFromDB = async (id: string) => {
  const isReportExists = await Report.findById(id);

  if (!isReportExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This report is not found !');
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedReport = await Report.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedReport) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete report!');
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const ReportService = {
  createReportIntoDB,
  getAllReportsFromDB,
  getSingleReportFromDB,
  updateReportIntoDB,
  deleteReportFromDB,
};
