import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';

dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT!) || 4000,
  DATABASE: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.EXPIRES_IN,
};

export const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

export default (callback: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await callback(req, res);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ error: error.message });
      } else res.status(500).send({ error: 'Internal Server Error!' });
    }
  };

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  static NotFoundError(message: string) {
    return new CustomError(message, 'NotFoundError', 404);
  }

  static ValidationError(message: string) {
    return new CustomError(message, 'ValidationError', 400);
  }

  static UnauthorizedError(message: string) {
    return new CustomError(message, 'UnauthorizedError', 401);
  }
}

export const generateToken = async ({
  id,
  email,
  name,
}: {
  id: string;
  email: string;
  name: string;
}): Promise<string> => {
  return jwt.sign({ id, email, name }, ENV.JWT_SECRET!, {
    expiresIn: ENV.EXPIRES_IN,
  });
};

export const decodeToken = async (token: string): Promise<any> => {
  const payload = jwt.decode(token);

  if (!payload) throw CustomError.UnauthorizedError('Unauthorized!');
  return payload;
};

export const hashPassword = async (password: string): Promise<string> =>
  hash(password);

export const comparePasswords = async (
  digest: string,
  password: string
): Promise<boolean> => verify(digest, password);

export const mergeName = (firstName: string, lastName: string): string =>
  `${lastName} ${firstName}`;
