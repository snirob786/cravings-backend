import { Types } from 'mongoose';

export type TSpecialMenu = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  platter: [
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
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
