import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ModeratorRoutes } from '../modules/Moderator/moderator.route';
import { RestaurantRoutes } from '../modules/Restaurant/restaurant.route';
import { DeliveryManRoutes } from '../modules/DeliveryMan/deliveryMan.route';
import { UserRoutes } from '../modules/user/user.route';
import { HomeRoutes } from '../modules/Home/home.route';
import { SuperAdminRoutes } from '../modules/SuparAdmin/superAdmin.route';
import { CategoriesRoutes } from '../modules/Category/category.route';
import { SubCategoriesRoutes } from '../modules/SubCategory/subCategory.route';
import { MenuItemRoutes } from '../modules/MenuItems/menuItem.route';

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
    path: '/moderators',
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
    route: RestaurantRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/sub-categories',
    route: SubCategoriesRoutes,
  },
  {
    path: '/menu-items',
    route: MenuItemRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
