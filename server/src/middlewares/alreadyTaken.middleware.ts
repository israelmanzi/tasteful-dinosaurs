import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../util';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prismaClient = new PrismaClient();
    const { email } = req.body;

    const isUserRegistered = await prismaClient.user.findUnique({
      where: { email },
    });

    if (isUserRegistered)
      throw CustomError.ValidationError(
        'An account with provided credentials already exists!'
      );

    next();
  } catch (error: any) {
    res.status(error.statusCode).send({ error: error.message });
  }
};
