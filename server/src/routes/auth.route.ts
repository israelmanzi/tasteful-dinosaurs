import { Router } from 'express';
import authController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/authenticated.middleware';
import accountAlreadyExists from '../middlewares/alreadyTaken.middleware';
import errorHandler from '../util';

const router: Router = Router();

router
  .post(
    '/register',
    [accountAlreadyExists],
    errorHandler(authController.registerAccount)
  )
  .post('/generate-auth-token', errorHandler(authController.generateAuthToken))
  .get(
    '/login-info',
    [isAuthenticated],
    errorHandler(authController.getAuthenticatedInfo)
  );

export default router;
