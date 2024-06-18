import { Router } from 'express';
import isAuthenticated from '../middlewares/authenticated.middleware';
import errorHandler from '../util';
import bookController from '../controllers/book.controller';

const router: Router = Router();

router
  .post('/register', isAuthenticated, errorHandler(bookController.registerBook))
  .get('/:bookId', isAuthenticated, errorHandler(bookController.getBookById))
  .get('/', isAuthenticated, errorHandler(bookController.getAllBooks));

export default router;
