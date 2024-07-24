import { Types } from 'mongoose';

export type TRating = {
  rating: number;
  review: string;
  menuItem: {
    type: Types.ObjectId;
  };
  category: {
    type: Types.ObjectId;
  };
  subCategory: {
    type: Types.ObjectId;
  };
  platter: {
    type: Types.ObjectId;
  };
  specialMenu: {
    type: Types.ObjectId;
  };
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
