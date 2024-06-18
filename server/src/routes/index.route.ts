import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from '../swagger.json';
import authRoutes from './auth.route';
import bookRoutes from './book.route';
import errorHandler from '../util';

const routes: Router = Router();

routes
  .get(
    '/healthcheck',
    errorHandler(async (req: Request, res: Response) => {
      const healthcheck = {
        uptime: process.uptime(),
        responseTime: process.hrtime(),
        message: 'OK',
        timestamp: Date.now(),
      };
      try {
        res.status(200).send({ healthcheck });
      } catch (error) {
        res.status(503).send(error);
      }
    })
  )
  .use('/auth', authRoutes)
  .use('/books', bookRoutes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default routes;
