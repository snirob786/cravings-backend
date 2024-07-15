import { Types } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type TRestaurant = {
  title: string;
  logo: String;
  status: 'active' | 'deleted' | 'inactive';
  address: TAddress;
  restaurantType: String;
  cuisine: String;
  owner: Types.ObjectId;
  moderator: [
    {
      type: Types.ObjectId;
    },
  ];
  createdBy: Types.ObjectId;
};
