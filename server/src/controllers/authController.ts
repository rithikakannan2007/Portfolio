import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

export class AuthController {
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide both email and password'
        });
        return;
      }

      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials. User not found.'
        });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials. Incorrect password.'
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_2026_xyz';
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Name, email, and password are required'
        });
        return;
      }

      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
        return;
      }

      const newUser = await User.create({
        name,
        email: email.toLowerCase().trim(),
        password,
        role: 'admin'
      });

      const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_2026_xyz';
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, role: newUser.role },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'Admin account created successfully',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Not authenticated' });
        return;
      }

      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
