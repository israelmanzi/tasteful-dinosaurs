import { NextFunction, Request, Response } from 'express';
import { CustomError, decodeToken } from '../util';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers.authorization;
    if (!headers)
      throw CustomError.UnauthorizedError('No authorization headers!');

    const token = headers.split(' ')[1];
    const isTokenValid = await decodeToken(token);

    if (!isTokenValid)
      throw CustomError.UnauthorizedError('Invalid authorization token!');

    req.body.token = isTokenValid;
    next();
  } catch (error: any) {
    res.status(error.statusCode).send({ error: error.message });
  }
};
