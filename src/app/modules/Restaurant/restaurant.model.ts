import mongoose, { Schema, Types } from 'mongoose';
import { RestaurantRegistrationStatus } from './restaurant.constant';
import { TRestaurant } from './restaurant.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Moderator } from '../Moderator/moderator.model';

const restaurantSchema = new mongoose.Schema<TRestaurant>(
  {
    title: {
      type: String,
      required: [true, 'Restaurant title is required'],
    },
    logo: {
      type: String,
    },
    status: {
      type: String,
      enum: RestaurantRegistrationStatus,
      default: 'active',
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    restaurantType: String,
    cuisine: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    pickUpAddress: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address,',
      },
    ],
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    moderator: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Moderator',
      },
    ],
    totalIncome: Number,
    totalOrders: Number,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

restaurantSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const restaurant = this; // doc
  // hashing password and save into DB

  // const course = await Course.findById(restaurant.course);
  // if (!course) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     `This course with id ${restaurant.course} is not found!`,
  //   );
  // }
  // const moderator = await Moderator.findById(restaurant.mentor);
  // if (!moderator) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     `This mentor with id ${restaurant.mentor} is not found!`,
  //   );
  // }

  next();
});

export const Restaurant = mongoose.model<TRestaurant>(
  'Restaurant',
  restaurantSchema,
);
