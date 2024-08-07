import { Schema, model } from 'mongoose';
import { BloodGroup, Gender } from './superAdmin.constant';
import {
  SuperAdminModel,
  TSuperAdmin,
  TUserName,
} from './superAdmin.interface';

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

const superAdminSchema = new Schema<TSuperAdmin, SuperAdminModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
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
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      ref: 'Address',
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      ref: 'Address',
    },
    profileImg: { type: String },
    status: {
      type: String,
      default: 'active',
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
superAdminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

// filter out deleted documents
superAdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

superAdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

superAdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
superAdminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await SuperAdmin.findOne({ id });
  return existingUser;
};

export const SuperAdmin = model<TSuperAdmin, SuperAdminModel>(
  'SuperAdmin',
  superAdminSchema,
);
