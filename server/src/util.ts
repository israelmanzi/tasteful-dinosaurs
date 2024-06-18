import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';

dotenv.config();

// Import env variables
export const ENV = {
  PORT: parseInt(process.env.PORT!) || 4000,
  DATABASE: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.EXPIRES_IN,
};

// Cors options [Allow all origins]
export const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

// Error handler receives a callback and handles all errors thrown
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

// Define custom error class that extends Error
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  // not found error w/ status code: 404
  static NotFoundError(message: string) {
    return new CustomError(message, 'NotFoundError', 404);
  }

  // validation error w/ status code: 400
  static ValidationError(message: string) {
    return new CustomError(message, 'ValidationError', 400);
  }

  // unauthorized error w/ status code: 401
  static UnauthorizedError(message: string) {
    return new CustomError(message, 'UnauthorizedError', 401);
  }
}

// Function to generate/sign jwt token with [id, email, name]
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

// Function to decode jwt token and return payload
export const decodeToken = async (token: string): Promise<any> => {
  const payload = jwt.decode(token);

  if (!payload) throw CustomError.UnauthorizedError('Unauthorized!');
  return payload;
};

// Hash password
export const hashPassword = async (password: string): Promise<string> =>
  hash(password);

// Compare hashed password (hash, unhashed)
export const comparePasswords = async (
  digest: string,
  password: string
): Promise<boolean> => verify(digest, password);

// Generate fullname
export const mergeName = (firstName: string, lastName: string): string =>
  `${lastName} ${firstName}`;
