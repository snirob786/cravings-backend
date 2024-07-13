import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { MentorRoutes } from '../modules/Mentor/mentor.route';
import { batchRoutes } from '../modules/Batch/batch.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { HomeRoutes } from '../modules/Home/home.route';
import { SuperAdminRoutes } from '../modules/SuparAdmin/superAdmin.route';
import { ModulesRoutes } from '../modules/Modules/module.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: HomeRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/mentors',
    route: MentorRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/super-admins',
    route: SuperAdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/batches',
    route: batchRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/modules',
    route: ModulesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
