import { Types } from 'mongoose';

export type TRestaurant = {
  title: string;
  logo: String;
  status: 'active' | 'deleted' | 'inactive';
  address: Types.ObjectId;
  restaurantType: String;
  cuisine: String;
  owner: Types.ObjectId;
  pickUpAddress: [
    {
      type: Types.ObjectId;
    },
  ];
  order: [
    {
      type: Types.ObjectId;
    },
  ];
  moderator: [
    {
      type: Types.ObjectId;
    },
  ];
  totalIncome: number;
  totalOrders: number;
  createdBy: Types.ObjectId;
};
