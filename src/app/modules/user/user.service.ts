/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { TMentor } from '../Mentor/mentor.interface';
import { Mentor } from '../Mentor/mentor.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
// import {
//   generateAdminId,
//   generateFacultyId,
//   generateStudentId,
// } from './user.utils';
import { SuperAdmin } from '../SuparAdmin/superAdmin.model';
import { TSuperAdmin } from '../SuparAdmin/superAdmin.interface';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
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

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TMentor,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = 'mentor';
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

    const newFaculty = await Mentor.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
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
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
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
  userData.role = 'superAdmin';
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
    const newSuperAdmin = await SuperAdmin.create([payload], { session });

    if (!newSuperAdmin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create super admin',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newSuperAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  if (role === 'superAdmin') {
    result = await SuperAdmin.findOne({ id: userId }).populate('user');
  }

  if (role === 'faculty') {
    result = await Mentor.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  createSuperAdminIntoDB,
  getMe,
  changeStatus,
};
