import { Types } from 'mongoose';

export type TMenuItem = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
  hasVariation: Boolean;
  variations: [
    {
      type: Types.ObjectId;
    },
  ];
  price: Number;
  notes: String;
  description: String;
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
