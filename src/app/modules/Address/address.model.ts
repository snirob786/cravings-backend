import mongoose, { Schema } from 'mongoose';
import { AddressRegistrationStatus, AddressType } from './address.constant';
import { TAddress } from './address.interface';

const addressSchema = new mongoose.Schema<TAddress>(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    status: {
      type: String,
      enum: AddressRegistrationStatus,
      default: 'active',
    },
    street: String,
    city: {
      type: String,
      ref: 'City',
    },
    addressType: {
      type: String,
      enum: AddressType,
      required: [true, 'Address type is required'],
    },
    district: {
      type: String,
      ref: 'District',
    },
    country: {
      type: String,
      ref: 'Country',
      required: [true, 'Country is required'],
    },
    postalCode: Number,
    location: {
      lat: Number,
      long: Number,
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Address = mongoose.model<TAddress>('Address', addressSchema);
