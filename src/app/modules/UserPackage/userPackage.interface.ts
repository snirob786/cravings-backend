import { Types } from 'mongoose';

export type TPayment = {
  status: 'pending' | 'paid';
  transactionId: string;
  referenceId: string;
  paymentMethod: Types.ObjectId;
  amount: number;
  paymentPhone: string;
  paymentEmail: string;
  order: Types.ObjectId;
  restaurant: Types.ObjectId;
  createdBy: Types.ObjectId;
};
