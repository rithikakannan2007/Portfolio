import { Request, Response, NextFunction } from 'express';
import { PortfolioSettings } from '../models/PortfolioSettings';

export class SettingsController {
  public async getSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let settings = await PortfolioSettings.findOne();
      if (!settings) {
        settings = await PortfolioSettings.create({
          siteTitle: 'Alex Morgan | Full-Stack Developer Portfolio',
          metaDescription: 'Modern Full-Stack Developer Portfolio showcasing web applications, skills, and credentials.',
          primaryColor: '#6366f1',
          enableContactForm: true,
          showResumeButton: true,
          customFooterText: 'Built with React, TypeScript, Express & MongoDB'
        });
      }
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  }

  public async updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let settings = await PortfolioSettings.findOne();
      if (settings) {
        Object.assign(settings, req.body);
        await settings.save();
      } else {
        settings = await PortfolioSettings.create(req.body);
      }
      res.status(200).json({
        success: true,
        message: 'Portfolio settings updated successfully',
        data: settings
      });
    } catch (error) {
      next(error);
    }
  }
}

export const settingsController = new SettingsController();
