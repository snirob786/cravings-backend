import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { deliveryManSearchableFields } from './deliveryMan.constant';
import { TDeliveryMan } from './deliveryMan.interface';
import { DeliveryMan } from './deliveryMan.model';

const getAllDeliveryMansFromDB = async (query: Record<string, unknown>) => {
  /*
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 
   
  let searchTerm = '';   // SET DEFAULT VALUE 

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string; 
  }

  
 // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  { email: { $regex : query.searchTerm , $options: i}}
  { presentAddress: { $regex : query.searchTerm , $options: i}}
  { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  
  // WE ARE DYNAMICALLY DOING IT USING LOOP
   const searchQuery = Student.find({
     $or: studentSearchableFields.map((field) => ({
       [field]: { $regex: searchTerm, $options: 'i' },
    })),
   });

  
   // FILTERING fUNCTIONALITY:
  
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
   excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

 
  // SORTING FUNCTIONALITY:
  
  let sort = '-createdAt'; // SET DEFAULT VALUE 
 
 // IF sort  IS GIVEN SET IT
  
   if (query.sort) {
    sort = query.sort as string;
  }

   const sortQuery = filterQuery.sort(sort);


   // PAGINATION FUNCTIONALITY:

   let page = 1; // SET DEFAULT VALUE FOR PAGE 
   let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
   let skip = 0; // SET DEFAULT VALUE FOR SKIP


  // IF limit IS GIVEN SET IT
  
  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  
  
  // FIELDS LIMITING FUNCTIONALITY:

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 

  fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
  fields: 'name email'; // HOW IT SHOULD BE 

  let fields = '-__v'; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');

  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;

  */

  const deliveryManQuery = new QueryBuilder(
    DeliveryMan.find()
      .populate('user')
      .populate('presentAddress')
      .populate('permanentAddress')
      .populate('order')
      .populate('order')
      .populate('restaurant'),
    query,
  )
    .search(deliveryManSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await deliveryManQuery.countTotal();
  const result = await deliveryManQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleDeliveryManFromDB = async (id: string) => {
  const result = await DeliveryMan.findById(id)
    .populate('user')
    .populate('presentAddress')
    .populate('permanentAddress')
    .populate('order')
    .populate('order')
    .populate('restaurant');
  return result;
};

const updateDeliveryManIntoDB = async (
  id: string,
  payload: Partial<TDeliveryMan>,
) => {
  const { name, vehicle, ...remainingDeliveryManData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingDeliveryManData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (vehicle && Object.keys(vehicle).length) {
    for (const [key, value] of Object.entries(vehicle)) {
      modifiedUpdatedData[`vehicle.${key}`] = value;
    }
  }

  const result = await DeliveryMan.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteDeliveryFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedDeliveryMan = await DeliveryMan.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedDeliveryMan) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete delivery man',
      );
    }

    // get user _id from deletedStudent
    const userId = deletedDeliveryMan.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedDeliveryMan;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete delivery man');
  }
};

export const DeliveryManServices = {
  getAllDeliveryMansFromDB,
  getSingleDeliveryManFromDB,
  updateDeliveryManIntoDB,
  deleteDeliveryFromDB,
};
