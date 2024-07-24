import { Types } from 'mongoose';

export type TAddress = {
  title: string;
  status: 'active' | 'deleted' | 'inactive';
  addressType: 'present' | 'permanent' | 'delivery' | 'pickUp';
  address: string;
  street: string;
  city: {
    type: Types.ObjectId;
  };
  district: {
    type: Types.ObjectId;
  };
  country: {
    type: Types.ObjectId;
  };
  postalCode: number;
  location: {
    lat: number;
    long: Number;
  };
  order: [
    {
      type: Types.ObjectId;
    },
  ];
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
