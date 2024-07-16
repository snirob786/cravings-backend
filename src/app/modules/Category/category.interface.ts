import { Types } from 'mongoose';

export type TCategory = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  subCategory: [
    {
      type: Types.ObjectId;
    },
  ];
  menuItem: [
    {
      type: Types.ObjectId;
    },
  ];
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
