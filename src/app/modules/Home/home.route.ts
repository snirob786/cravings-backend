/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { HomeController } from './home.controller';

const router = express.Router();

router.get('/', HomeController.home);

export const HomeRoutes = router;
