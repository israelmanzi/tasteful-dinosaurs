import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './util';
import routes from './routes/index.route';

// Initiate express app
const app: Application = express();

app
  .use(express.json()) // middleware to parse incoming requests with json payload
  .use(cors(corsOptions)) // setup cors middleware allowing all origins
  .use(cookieParser()) // middleware to parse incoming req cookies
  .use((req: Request, res: Response, next: NextFunction) => {
    console.info(`PATH:${req.originalUrl} METHOD:${req.method}`); // logger middleware to log req url and req method of incoming requests
    next();
  })
  .use('/api/v1', routes); // define endpoints from routes on /api/v1

export default app;
