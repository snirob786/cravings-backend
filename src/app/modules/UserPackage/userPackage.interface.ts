import { Types } from 'mongoose';

export type TUserPackage = {
  status: 'inactive' | 'active';
  title: string;
  price: number;
  validityDays: number;
  menuItemLimit: number;
  specialMenuLimit: number;
  platterLimit: number;
  moderatorLimit: number;
  createdBy: Types.ObjectId;
};
