import { Types } from 'mongoose';

export type TPaymentMethod = {
  status: 'active' | 'inactive' | 'deleted';
  title: string;
  type: string;
  createdBy: Types.ObjectId;
};
