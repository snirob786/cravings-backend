/* eslint-disable @typescript-eslint/no-explicit-any */
// import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
// import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { TUser } from '../user/user.interface';
import { TNormalUser } from '../NormalUser/normalUser.interface';
import { USER_ROLE } from '../user/user.constant';
import mongoose from 'mongoose';
import { NormalUser } from '../NormalUser/normalUser.model';

const registerUser = async (
  file: any,
  password: string,
  payload: TNormalUser,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = USER_ROLE.user;
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    // userData.id = await generateAdminId();

    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // //send image to cloudinary
    // const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const alreadyExisted = await User.findOne({ email: userData.email });

    if (alreadyExisted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This email already exists');
    }

    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    // payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // payload.profileImg = secure_url;

    // create a admin (transaction-2)
    const newNormalUser = await NormalUser.create([payload], { session });

    if (!newNormalUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    const newUpdateUser = await User.updateOne(
      { _id: newUser[0]?._id },
      { user: newNormalUser[0]._id },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return newNormalUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user: any = await User.isUserExistsByCustomUsername(payload.username);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
    superAdmin: user.superAdmin,
    admin: user.admin,
    moderator: user.moderator,
    deliveryMan: user.deliveryMan,
    user: user.user,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    user: { ...jwtPayload, username: payload.username },
    accessToken,
    refreshToken,
  };
};

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { currentPassword: string; newPassword: string },
// ) => {
//   const lastPasswords = await ChangePassword.find({
//     createdBy: userData._id,
//   })
//     .select('+password')
//     .sort({ createdAt: -1 })
//     .limit(2);

//   if (lastPasswords.length) {
//     for (const oldPass of lastPasswords) {
//       const isMatched = await User.isPasswordMatched(
//         payload.newPassword,
//         oldPass.password,
//       );
//       if (isMatched)
//         throw new AppError(
//           httpStatus.FORBIDDEN,
//           `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${oldPass.updatedAt}).`,
//         );
//     }
//   }

//   // checking if the user is exist
//   const user: any = await User.isUserExistsByCustomId(userData._id);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }

//   const isUserCurrentPassMatchedWithNew = await User.isPasswordMatched(
//     payload.newPassword,
//     user?.password,
//   );

//   //checking if the password is correct
//   if (isUserCurrentPassMatchedWithNew)
//     throw new AppError(
//       httpStatus.FORBIDDEN,
//       `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${user.updatedAt}).`,
//     );

//   const isUserCurrentPassMatchedWithCurrent = await User.isPasswordMatched(
//     payload.currentPassword,
//     user?.password,
//   );

//   if (!isUserCurrentPassMatchedWithCurrent)
//     throw new AppError(httpStatus.FORBIDDEN, 'Current Password do not matched');

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   );

//   await ChangePassword.create({
//     createdBy: user?._id,
//     password: user?.password,
//   });

//   return null;
// };

export const AuthServices = {
  registerUser,
  loginUser,
  // changePassword,
};
