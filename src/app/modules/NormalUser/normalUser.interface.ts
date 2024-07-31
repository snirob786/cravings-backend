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

export type TNormalUser = {
  // id: string;
  user: Types.ObjectId;
  role: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: Types.ObjectId;
  permanentAddress: Types.ObjectId;
  deliveryAddress: [
    {
      type: Types.ObjectId;
    },
  ];
  profileImg?: string;
  restaurant: Types.ObjectId;
  status: string;
};

export interface NormalUserModel extends Model<TNormalUser> {
  isUserExists(id: string): Promise<TNormalUser | null>;
}
