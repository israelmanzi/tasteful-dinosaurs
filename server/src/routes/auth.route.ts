import { Router } from 'express';
import authController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/authenticated.middleware';
import accountAlreadyExists from '../middlewares/alreadyTaken.middleware';
import errorHandler from '../util';

const router: Router = Router();

router
  .post(
    '/register',
    [accountAlreadyExists], // Middleware to check if account already exists
    errorHandler(authController.registerAccount) // Handle register account
  )
  .post(
    '/generate-auth-token',
    errorHandler(authController.generateAuthToken) // Handle auth token generation
  )
  .get(
    '/login-info',
    [isAuthenticated], // Middleware to check if user is authenticated
    errorHandler(authController.getAuthenticatedInfo) // Handle getting authenticated user info
  );

export default router;
