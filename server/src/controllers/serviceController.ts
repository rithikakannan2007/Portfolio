import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service';

export class ServiceController {
  public async getAllServices(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await Service.find().sort({ createdAt: 1 });
      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  public async getServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await Service.findById(req.params.id);
      if (!record) {
        res.status(404).json({ success: false, message: 'Service not found' });
        return;
      }
      res.status(200).json({ success: true, data: record });
    } catch (error) {
      next(error);
    }
  }

  public async createService(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newRecord = await Service.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Service added successfully',
        data: newRecord
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Service not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Service updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteService(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await Service.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Service not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Service deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const serviceController = new ServiceController();
