import { NextFunction, Request, Response } from 'express';
import { CustomError, decodeToken } from '../util';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers.authorization; // Get authorization headers
    if (!headers) {
      // Check if headers are present
      throw CustomError.UnauthorizedError('No authorization headers!'); // Throw error if headers are missing
    }

    const token = headers.split(' ')[1]; // Extract token from headers
    const isTokenValid = await decodeToken(token); // Decode and verify token

    if (!isTokenValid) {
      // Check if token is valid
      throw CustomError.UnauthorizedError('Invalid authorization token!'); // Throw error if token is invalid
    }

    req.body.token = isTokenValid; // Attach decoded token to request body
    next(); // Proceed to the next middleware
  } catch (error: any) {
    // Handle errors and send error response
    res.status(error.statusCode || 500).send({ error: error.message });
  }
};
