/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TCustomer = {
  // id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  order: [
    {
      type: Types.ObjectId;
    },
  ];
  deliveryAddress: [
    {
      type: Types.ObjectId;
    },
  ];
  profileImg?: string;
  status: string;
  restaurant: Types.ObjectId;
};

export interface CustomerModel extends Model<TCustomer> {
  isUserExists(id: string): Promise<TCustomer | null>;
}
