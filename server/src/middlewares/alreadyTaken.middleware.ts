import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../util';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prismaClient = new PrismaClient(); // Initialize PrismaClient
    const { email } = req.body; // Extract email from request body

    // Check if user already exists with the provided email
    const isUserRegistered = await prismaClient.user.findUnique({
      where: { email },
    });

    if (isUserRegistered) {
      // Throw validation error if user already exists
      throw CustomError.ValidationError(
        'An account with provided credentials already exists!'
      );
    }

    next(); // Proceed to the next middleware if no user found
  } catch (error: any) {
    // Handle errors and send error response
    res.status(error.statusCode || 500).send({ error: error.message });
  }
};
