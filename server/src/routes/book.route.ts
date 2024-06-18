import { Router } from 'express';
import isAuthenticated from '../middlewares/authenticated.middleware';
import errorHandler from '../util';
import bookController from '../controllers/book.controller';

const router: Router = Router();

router
  .use(isAuthenticated)
  .post('/register', errorHandler(bookController.registerBook))
  .get('/:bookId', errorHandler(bookController.getBookById))
  .get('/', errorHandler(bookController.getAllBooks));

export default router;
