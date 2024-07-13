/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TVehicle = {
  type: string;
  numberPlate: string;
  brand: string;
  companyName: string;
  model: string;
  otherDetails: string;
};

export type TDeliveryMan = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  vehicle: TVehicle;
  profileImg?: string;
  status: string;
  createdBy: Types.ObjectId;
};

//for creating static

export interface DeliveryManModel extends Model<TDeliveryMan> {
  isUserExists(id: string): Promise<TDeliveryMan | null>;
}

// for creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
