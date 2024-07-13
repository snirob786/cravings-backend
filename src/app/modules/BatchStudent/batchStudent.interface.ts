import { Types } from 'mongoose';

export type TBatchStudent = {
  batch: Types.ObjectId;
  student: Types.ObjectId;
  isEliminated: boolean;
  isCompleted: boolean;
  elimination: {
    reason: string;
    message: string;
    eliminationDate: Date;
  };
  completionDate: Date;
  createdBy: Types.ObjectId;
};
