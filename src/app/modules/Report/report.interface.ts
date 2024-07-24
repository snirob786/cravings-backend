import { Types } from 'mongoose';

export type TReport = {
  reportFrom: Types.ObjectId;
  fromRole: string;
  reportAbout: Types.ObjectId;
  aboutRole: string;
  issues: Types.ObjectId;
};
