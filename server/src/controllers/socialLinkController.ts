import { Request, Response, NextFunction } from 'express';
import { SocialLink } from '../models/SocialLink';

export class SocialLinkController {
  public async getAllSocialLinks(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const links = await SocialLink.find().sort({ createdAt: 1 });
      res.status(200).json({
        success: true,
        count: links.length,
        data: links
      });
    } catch (error) {
      next(error);
    }
  }

  public async createSocialLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newLink = await SocialLink.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Social link added successfully',
        data: newLink
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateSocialLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Social link not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Social link updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteSocialLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await SocialLink.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Social link not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Social link deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const socialLinkController = new SocialLinkController();
