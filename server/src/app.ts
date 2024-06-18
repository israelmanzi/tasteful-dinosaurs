import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './util';
import routes from './routes/index.route';

const app: Application = express();

app
  .use(express.json())
  .use(cors(corsOptions))
  .use(cookieParser())
  .use((req: Request, res: Response, next: NextFunction) => {
    console.info(`PATH:${req.originalUrl} METHOD:${req.method}`);
    next();
  })
  .use('/api/v1', routes);

export default app;
