import { Schema, model } from 'mongoose';
import { BloodGroup, Gender } from './normalUser.constant';
import {
  NormalUserModel,
  TNormalUser,
  TUserName,
} from './normalUser.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const normalUserSchema = new Schema<TNormalUser, NormalUserModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    permanentAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    deliveryAddress: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    profileImg: { type: String },
    status: {
      type: String,
      default: 'active',
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'Restaurant',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },

    timestamps: true,
  },
);

// generating full name
normalUserSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

// filter out deleted documents
normalUserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

normalUserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

normalUserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
normalUserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await NormalUser.findOne({ _id: id });
  return existingUser;
};

export const NormalUser = model<TNormalUser, NormalUserModel>(
  'NormalUser',
  normalUserSchema,
);
