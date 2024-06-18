import { Request, Response } from 'express';
import IUser from '../dtos/user.dto';
import AuthService from '../service/auth.service';
import { generateToken, mergeName } from '../util';

const authService = new AuthService();

export default {
  registerAccount: async (req: Request, res: Response) => {
    const reqBody: IUser = req.body;

    // Register new user account
    const user = await authService.registerAccount(reqBody);

    // Generate authentication token
    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: mergeName(user.firstName, user.lastName),
    });

    // Set token in response header and send response
    res.setHeader('Authorization', `Bearer ${token}`).status(201).send({
      user,
      message: 'Admin created successfully!',
    });
  },

  generateAuthToken: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Generate authentication token
    const token = await authService.generateAuthToken({ email, password });

    // Set token in response header and send response
    res
      .setHeader('Authorization', `Bearer ${token}`)
      .status(200)
      .send({ token, message: 'Token generated successfully!' });
  },

  getAuthenticatedInfo: async (req: Request, res: Response) => {
    const { token } = req.body;

    // Get authenticated user information
    const info = await authService.getAuthenticatedInfo(token);

    // Send user information in response
    res.status(200).send({ info, message: 'Authenticated user information!' });
  },

  logout: async (req: Request, res: Response) => {
    // Clear authentication token
    res.setHeader('Authorization', `Bearer `).status(200).json({
      success: true,
      message: 'Logout successfully!',
    });
  },
};
