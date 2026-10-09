import { Request, Response, NextFunction } from 'express';
import { Achievement } from '../models/Achievement';

export class AchievementController {
  public async getAllAchievements(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await Achievement.find().sort({ date: -1 });
      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAchievementById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await Achievement.findById(req.params.id);
      if (!record) {
        res.status(404).json({ success: false, message: 'Achievement not found' });
        return;
      }
      res.status(200).json({ success: true, data: record });
    } catch (error) {
      next(error);
    }
  }

  public async createAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newRecord = await Achievement.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Achievement added successfully',
        data: newRecord
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Achievement not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Achievement updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await Achievement.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Achievement not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Achievement deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const achievementController = new AchievementController();
