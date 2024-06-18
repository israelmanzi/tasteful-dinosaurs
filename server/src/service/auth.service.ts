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
    this.prismaClient = new PrismaClient();
  }

  public async registerAccount(body: IUser): Promise<any> {
    const { isValid, errors } = UserValidator.validate(body);

    if (errors && !isValid) throw CustomError.ValidationError(errors[0]);

    const user = await this.prismaClient.user.create({
      data: { ...body, password: await hashPassword(body.password) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    if (!user) throw CustomError.ValidationError('Unable to create user!');

    return user;
  }

  public async generateAuthToken({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || !(await comparePasswords(user.password, password)))
      throw CustomError.UnauthorizedError('Invalid email or password!');

    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: mergeName(user.firstName, user.lastName),
    });

    return token;
  }

  public async getAuthenticatedInfo(payload: any): Promise<any> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) throw CustomError.UnauthorizedError('Unauthorized!');

    return user;
  }
}
