import { Types } from 'mongoose';

export type TOrder = {
  title: string;
  status:
    | 'started'
    | 'pendingForPickUp'
    | 'pickUped'
    | 'delivering'
    | 'delivered'
    | 'canceled';
  addressType: 'present' | 'permanent' | 'delivery' | 'pickUp';
  address: string;
  street: string;
  menuItem: [
    {
      item: Types.ObjectId;
      quantity: number;
    },
  ];
  platter: [
    {
      item: Types.ObjectId;
      quantity: number;
    },
  ];
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
  specialMenu: Types.ObjectId;
  admin: Types.ObjectId;
  superAdmin: Types.ObjectId;
  moderator: Types.ObjectId;
  deliveryMan: Types.ObjectId;
  customer: Types.ObjectId;
  pickUpAddress: Types.ObjectId;
  deliveryAddress: Types.ObjectId;
  delivery: Types.ObjectId;
  payment: Types.ObjectId;
  totalPrice: number;
  restaurant: Types.ObjectId;
  canceledBy: Types.ObjectId;
  cancelReason: string;
  createdBy: Types.ObjectId;
};
