import { Request, Response } from 'express';
import IUser from '../dtos/user.dto';
import AuthService from '../service/auth.service';
import { generateToken, mergeName } from '../util';

const authService = new AuthService();

export default {
  registerAccount: async (req: Request, res: Response) => {
    const reqBody: IUser = req.body;

    const user = await authService.registerAccount(reqBody);

    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: mergeName(user.firstName, user.lastName),
    });

    res.setHeader('Authorization', `Bearer ${token}`).status(201).send({
      user,
      message: 'Admin created successfully!',
    });
  },
  generateAuthToken: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await authService.generateAuthToken({ email, password });

    res
      .setHeader('Authorization', `Bearer ${token}`)
      .status(200)
      .send({ token, message: 'Token generated successfully!' });
  },
  getAuthenticatedInfo: async (req: Request, res: Response) => {
    const { token } = req.body;

    const info = await authService.getAuthenticatedInfo(token);

    res.status(200).send({ info, message: 'Authenticated user information!' });
  },

  logout: async (req: Request, res: Response) => {
    res.setHeader('Authorization', `Bearer `).status(200).json({
      success: true,
      message: 'Logout successfully!',
    });
  },
};
