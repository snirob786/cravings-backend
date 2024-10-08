/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { USER_ROLE, UserStatus } from './user.constant';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: [
        USER_ROLE.admin,
        USER_ROLE.deliveryMan,
        USER_ROLE.moderator,
        USER_ROLE.superAdmin,
        USER_ROLE.user,
      ],
    },
    superAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'SuperAdmin',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    moderator: {
      type: Schema.Types.ObjectId,
      ref: 'Moderator',
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
    },

    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    deliveryMan: {
      type: Schema.Types.ObjectId,
      ref: 'DeliveryMan',
    },
    userPackage: {
      type: Schema.Types.ObjectId,
      ref: 'UserPackage',
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isUserExistsByCustomUsername = async function (
  username: string,
) {
  return await User.findOne({
    $or: [{ username }, { email: username }],
  }).select('+password').populate("userPackage").populate("user").populate("admin").populate("order").populate("deliveryMan");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
