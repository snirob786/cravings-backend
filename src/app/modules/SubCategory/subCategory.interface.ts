import { Types } from 'mongoose';

export type TSubCategory = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  category: Types.ObjectId;
  menuItem: [
    {
      type: Types.ObjectId;
    },
  ];
  order: [
    {
      type: Types.ObjectId;
    },
  ];
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
