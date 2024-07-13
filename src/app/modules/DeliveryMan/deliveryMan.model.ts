import { Schema, model } from 'mongoose';
import {
  DeliveryManModel,
  TVehicle,
  TDeliveryMan,
  TUserName,
} from './deliveryMan.interface';

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

const vehicleSchema = new Schema<TVehicle>({
  type: {
    type: String,
    required: [true, 'Vehicle type is required'],
  },
  numberPlate: {
    type: String,
  },
  brand: {
    type: String,
  },
  companyName: {
    type: String,
    required: [true, 'Vehicle company name is required'],
  },
  model: {
    type: String,
  },
  otherDetails: {
    type: String,
  },
});

const deliveryManSchema = new Schema<TDeliveryMan, DeliveryManModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
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
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    vehicle: {
      type: vehicleSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    status: {
      type: String,
      default: 'in-progress',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

//virtual
deliveryManSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

// Query Middleware
deliveryManSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

deliveryManSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

deliveryManSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
deliveryManSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await DeliveryMan.findOne({ id });
  return existingUser;
};

export const DeliveryMan = model<TDeliveryMan, DeliveryManModel>(
  'DeliveryMan',
  deliveryManSchema,
);
