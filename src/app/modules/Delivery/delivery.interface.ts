import { Types } from 'mongoose';

export type TDelivery = {
  deliveryAddress: Types.ObjectId;
  pickUpAddress: Types.ObjectId;
  status:
    | 'started'
    | 'pendingForPickUp'
    | 'pickUped'
    | 'delivering'
    | 'delivered'
    | 'canceled';
  order: Types.ObjectId;
  note: string;
  canceledBy: Types.ObjectId;
  cancelReason: string;
  deliveryMan: Types.ObjectId;
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
