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
        uptime: process.uptime(), // Application uptime
        responseTime: process.hrtime(), // Response time
        message: 'OK', // Healthcheck message
        timestamp: Date.now(), // Current timestamp
      };
      try {
        res.status(200).send({ healthcheck }); // Send healthcheck response
      } catch (error) {
        res.status(503).send(error); // Send error response
      }
    })
  )
  .use('/auth', authRoutes) // Auth routes
  .use('/books', bookRoutes) // Book routes
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // Swagger API docs

export default routes;
