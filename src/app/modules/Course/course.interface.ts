import { Types } from 'mongoose';
import { TBatch } from '../Batch/batch.interface';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  batches: Array<TBatch>;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
  mentor: Types.ObjectId;
  duration: string;
  createdBy: Types.ObjectId;
};

export type TCourseMentor = {
  course: Types.ObjectId;
  mentors: [Types.ObjectId];
};
