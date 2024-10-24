/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { TModerator } from '../Moderator/moderator.interface';
import { Moderator } from '../Moderator/moderator.model';
import { TDeliveryMan } from '../DeliveryMan/deliveryMan.interface';
import { DeliveryMan } from '../DeliveryMan/deliveryMan.model';
import { TUser } from './user.interface';
import { User } from './user.model';
// import {
//   generateAdminId,
//   generateFacultyId,
//   generateStudentId,
// } from './user.utils';
import { SuperAdmin } from '../SuperAdmin/superAdmin.model';
import { TSuperAdmin } from '../SuperAdmin/superAdmin.interface';
import { USER_ROLE } from './user.constant';
import { Restaurant } from '../Restaurant/restaurant.model';
import { NormalUser } from '../NormalUser/normalUser.model';
import { TNormalUser } from '../NormalUser/normalUser.interface';

const createDeliveryManIntoDB = async (
  file: any,
  password: string,
  payload: TDeliveryMan,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = USER_ROLE.deliveryMan;
  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    // userData.id = await generateStudentId(admissionSemester);

    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // //send image to cloudinary
    // const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // payload.profileImg = secure_url;

    // create a student (transaction-2)

    const newDeliveryMan = await DeliveryMan.create([payload], { session });

    if (!newDeliveryMan.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create delivery man',
      );
    }

    const newUpdateUser = await User.updateOne(
      { _id: newUser[0]?._id },
      { admin: newDeliveryMan[0]._id },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return newDeliveryMan;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createModeratorIntoDB = async (
  file: any,
  password: string,
  payload: TModerator,
) => {
  // create a user object

  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = USER_ROLE.moderator;
  //set faculty email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    // userData.id = await generateFacultyId();

    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // //send image to cloudinary
    // const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    // payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // payload.profileImg = secure_url;
    // create a faculty (transaction-2)

    const newModerator: any = await Moderator.create([payload], { session });

    if (!newModerator.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create modeartor');
    }
    const newUpdateUser = await User.updateOne(
      { _id: newUser[0]?._id },
      { admin: newModerator[0]._id },
      { session },
    );

    let getRestaurantModerators: any = await Restaurant.findById(
      payload.restaurant,
    );

    let newRestaurantModerators = getRestaurantModerators?.moderator
      ? getRestaurantModerators?.moderator
      : [];
    newRestaurantModerators.push(newModerator[0]._id);
    const newUpdateRestaurant = await Restaurant.updateOne(
      { _id: getRestaurantModerators?._id },
      { moderator: newRestaurantModerators },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return newModerator;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createNormalUserIntoDB = async (
  file: any,
  password: string,
  payload: TNormalUser,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = USER_ROLE.admin;
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
      { admin: newNormalUser[0]._id },
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
const createSuperAdminIntoDB = async (
  file: any,
  password: string,
  payload: TSuperAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = USER_ROLE.superAdmin;
  userData.status = 'active';
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // //send image to cloudinary
    // const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser: any = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    // payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // payload.profileImg = secure_url;

    // create a admin (transaction-2)
    const newSuperAdmin: any = await SuperAdmin.create([payload], { session });
    console.log('🚀 ~ newSuperAdmin:', newSuperAdmin);

    if (!newSuperAdmin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create super admin',
      );
    }
    const newUpdateUser = await User.updateOne(
      { _id: newUser[0]?._id },
      { superAdmin: newSuperAdmin[0]._id },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return newSuperAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getSingleUser = async (id: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = await User.findById(id);

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const changeUserToAdmin = async (id: string, payload: any) => {
  try {
    const findUser: any = await User.findById(id).populate('user');
    if (!findUser) {
      throw new Error('This user is not exist.');
    }
    const findAdmin = await Admin.findOne({ email: findUser?.email });
    let adminId = null;
    if (!findAdmin) {
      const adminParams: any = findUser?.user;

      const adminParamsNew = {
        role: 'Admin',
        email: adminParams?.email,
        user: adminParams?.user,
        gender: adminParams?.gender,
        name: adminParams?.name,
        dateOfBirth: adminParams?.dateOfBirth,
        contactNo: adminParams?.contactNo,
        bloodGroup: adminParams?.bloodGroup,
        profileImg: adminParams?.profileImg,
        emergencyContactNo: adminParams?.emergencyContactNo,
        presentAddress: adminParams?.presentAddress,
        permanentAddress: adminParams?.permanentAddress,
        address: adminParams?.address,
        status: 'active',
      };

      const createAdmin = await Admin.create(adminParamsNew);
      adminId = createAdmin?._id;
    } else {
      adminId = findAdmin?._id;
    }
    const newUserParam = {
      ...payload,
      admin: adminId,
      role: 'admin',
    };
    const result = await User.findByIdAndUpdate(findUser?._id, newUserParam, {
      new: true,
    });
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const UserServices = {
  createDeliveryManIntoDB,
  createModeratorIntoDB,
  createNormalUserIntoDB,
  createSuperAdminIntoDB,
  changeUserToAdmin,
  getSingleUser,
  changeStatus,
};
