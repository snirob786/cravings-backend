import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseMentor,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  batches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
    },
  ],
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor',
  },
  duration: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Course = model<TCourse>('Course', courseSchema);

const courseMentorSchema = new Schema<TCourseMentor>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  mentors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mentor',
    },
  ],
});

export const CourseMentor = model<TCourseMentor>(
  'CourseMentor',
  courseMentorSchema,
);
