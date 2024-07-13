import { Types } from 'mongoose';

export type TModule = {
  title: string;
  course: Types.ObjectId;
  batch: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  moduleType: 'class' | 'assignment';
  startDate: Date;
  endDate: Date;
  mentor: Types.ObjectId;
  class: Types.ObjectId;
  assignment: Types.ObjectId;
  createdBy: Types.ObjectId;
};
