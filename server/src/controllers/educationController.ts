import { Request, Response, NextFunction } from 'express';
import { Education } from '../models/Education';

export class EducationController {
  public async getAllEducation(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await Education.find().sort({ startYear: -1 });
      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  public async getEducationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await Education.findById(req.params.id);
      if (!record) {
        res.status(404).json({ success: false, message: 'Education record not found' });
        return;
      }
      res.status(200).json({ success: true, data: record });
    } catch (error) {
      next(error);
    }
  }

  public async createEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newRecord = await Education.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Education record added successfully',
        data: newRecord
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await Education.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Education record not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Education record updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await Education.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Education record not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Education record deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const educationController = new EducationController();
