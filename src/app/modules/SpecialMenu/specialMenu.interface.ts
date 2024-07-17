import { Types } from 'mongoose';

export type TSpecialMenu = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  menuItem: [
    {
      type: Types.ObjectId;
    },
  ];
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
