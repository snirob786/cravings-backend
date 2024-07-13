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

const registerUser = async (payload: TUser) => {
  try {
    // checking if the user is exist
    const user = await User.findOne({ email: payload.email });

    if (user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist !');
    }
    const registerUser = await User.create(payload);
    return registerUser;
  } catch (err) {
    throw new Error(err as string);
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
