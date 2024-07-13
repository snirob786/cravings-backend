import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ModeratorRoutes } from '../modules/Moderator/moderator.route';
import { restaurantRoutes } from '../modules/Restaurant/restaurant.route';
import { DeliveryManRoutes } from '../modules/DeliveryMan/deliveryMan.route';
import { UserRoutes } from '../modules/user/user.route';
import { HomeRoutes } from '../modules/Home/home.route';
import { SuperAdminRoutes } from '../modules/SuparAdmin/superAdmin.route';

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
    path: '/delivery-man',
    route: DeliveryManRoutes,
  },
  {
    path: '/moderator',
    route: ModeratorRoutes,
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
    path: '/restaurants',
    route: restaurantRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
