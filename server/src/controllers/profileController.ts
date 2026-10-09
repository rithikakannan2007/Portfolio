import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profileService';

export class ProfileController {
  public async getProfile(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.getProfile();
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedProfile = await profileService.updateProfile(req.body);
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      });
    } catch (error) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();
