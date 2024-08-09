import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ModeratorRoutes } from '../modules/Moderator/moderator.route';
import { RestaurantRoutes } from '../modules/Restaurant/restaurant.route';
import { DeliveryManRoutes } from '../modules/DeliveryMan/deliveryMan.route';
import { UserRoutes } from '../modules/user/user.route';
import { HomeRoutes } from '../modules/Home/home.route';
import { SuperAdminRoutes } from '../modules/SuperAdmin/superAdmin.route';
import { CategoriesRoutes } from '../modules/Category/category.route';
import { SubCategoriesRoutes } from '../modules/SubCategory/subCategory.route';
import { MenuItemRoutes } from '../modules/MenuItems/menuItem.route';
import { SpecialMenusRoutes } from '../modules/SpecialMenu/specialMenu.route';
import { VariationsRoutes } from '../modules/Variation/variation.route';
import { PlattersRoutes } from '../modules/Platter/platter.route';
import { AddressRoutes } from '../modules/Address/address.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';
import { NormalUserRoutes } from '../modules/NormalUser/normalUser.route';
import { RatingRoutes } from '../modules/Rating/rating.route';
import { DeliveriesRoutes } from '../modules/Delivery/delivery.route';
import { ReportRoutes } from '../modules/Report/report.route';
import { PaymentMethodRoutes } from '../modules/PaymentMethod/paymentMethod.route';
import { UserPackageRoutes } from '../modules/UserPackage/userPackage.route';

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
    path: '/delivery-mans',
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
    path: '/normal-users',
    route: NormalUserRoutes,
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
    path: '/variations',
    route: VariationsRoutes,
  },
  {
    path: '/platters',
    route: PlattersRoutes,
  },
  {
    path: '/addresses',
    route: AddressRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/special-menus',
    route: SpecialMenusRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/ratings',
    route: RatingRoutes,
  },
  {
    path: '/reports',
    route: ReportRoutes,
  },
  {
    path: '/deliveries',
    route: DeliveriesRoutes,
  },
  {
    path: '/payment-methods',
    route: PaymentMethodRoutes,
  },
  {
    path: '/user-packages',
    route: UserPackageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
