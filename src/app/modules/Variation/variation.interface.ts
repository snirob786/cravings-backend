import { Types } from 'mongoose';

export type TVariation = {
  variationType: string;
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  unitType: string;
  unit: number;
  menuItem: Types.ObjectId;
  createdBy: Types.ObjectId;
};
