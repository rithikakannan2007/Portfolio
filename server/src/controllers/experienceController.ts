import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience';

export class ExperienceController {
  public async getAllExperience(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await Experience.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  public async getExperienceById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await Experience.findById(req.params.id);
      if (!record) {
        res.status(404).json({ success: false, message: 'Experience record not found' });
        return;
      }
      res.status(200).json({ success: true, data: record });
    } catch (error) {
      next(error);
    }
  }

  public async createExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newRecord = await Experience.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Experience record added successfully',
        data: newRecord
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Experience record not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Experience record updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await Experience.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Experience record not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Experience record deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const experienceController = new ExperienceController();
