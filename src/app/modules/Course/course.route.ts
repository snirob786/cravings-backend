import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/:id',
  // auth('student', 'mentor', 'admin', 'superAdmin'),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  CourseControllers.deleteCourse,
);

router.put(
  '/:courseId/assign-mentors',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.mentorsWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-mentors',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.mentorsWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
