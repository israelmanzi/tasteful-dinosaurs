import { PrismaClient } from '@prisma/client';
import IUser, { UserValidator } from '../dtos/user.dto';
import {
  CustomError,
  comparePasswords,
  generateToken,
  hashPassword,
  mergeName,
} from '../util';

export default class AuthService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient(); // Initialize PrismaClient
  }

  public async registerAccount(body: IUser): Promise<any> {
    const { isValid, errors } = UserValidator.validate(body); // Validate user data

    if (errors && !isValid) throw CustomError.ValidationError(errors[0]); // Throw validation error

    const user = await this.prismaClient.user.create({ // create user
      data: { ...body, password: await hashPassword(body.password) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    if (!user) throw CustomError.ValidationError('Unable to create user!'); // Throw error if user not created

    return user; // Return created user
  }

  public async generateAuthToken({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.prismaClient.user.findFirst({ // find first user with the provided email
      where: { email: email },
    });

    if (!user || !(await comparePasswords(user.password, password)))
      throw CustomError.UnauthorizedError('Invalid email or password!'); // Throw error if credentials invalid

    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: mergeName(user.firstName, user.lastName),
    });

    return token; // Return generated token
  }

  public async getAuthenticatedInfo(payload: any): Promise<any> {
    const user = await this.prismaClient.user.findFirst({
      where: { email: payload.email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) throw CustomError.UnauthorizedError('Unauthorized!'); // Throw error if user not found

    return user; // Return user info
  }
}
