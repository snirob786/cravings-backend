import { Types } from 'mongoose';
import { TModule } from '../Modules/module.interface';

export type TBatch = {
  title: string;
  course: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  mentor: Types.ObjectId;
  modules: Array<TModule>;
  createdBy: Types.ObjectId;
};
