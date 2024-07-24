import { Types } from 'mongoose';

export type TPlatter = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  category: {
    type: Types.ObjectId;
  };
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
  order: [
    {
      type: Types.ObjectId;
    },
  ];
  specialMenu: Types.ObjectId;
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
