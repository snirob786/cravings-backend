import mongoose, { Schema } from 'mongoose';
import { UserPackageStatus } from './userPackage.constant';
import { TUserPackage } from './userPackage.interface';

const userPackageSchema = new mongoose.Schema<TUserPackage>(
  {
    status: {
      type: String,
      enum: UserPackageStatus,
      default: 'active',
    },
    title: String,
    price: Number,
    validityDays: Number,
    menuItemLimit: Number,
    specialMenuLimit: Number,
    platterLimit: Number,
    moderatorLimit: Number,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const UserPackage = mongoose.model<TUserPackage>(
  'UserPackage',
  userPackageSchema,
);
