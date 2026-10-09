import { Request, Response, NextFunction } from 'express';
import { Certification } from '../models/Certification';

export class CertificationController {
  public async getAllCertifications(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await Certification.find().sort({ issueDate: -1 });
      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCertificationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await Certification.findById(req.params.id);
      if (!record) {
        res.status(404).json({ success: false, message: 'Certification not found' });
        return;
      }
      res.status(200).json({ success: true, data: record });
    } catch (error) {
      next(error);
    }
  }

  public async createCertification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newRecord = await Certification.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Certification added successfully',
        data: newRecord
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateCertification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Certification not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Certification updated successfully',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteCertification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await Certification.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Certification not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Certification deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const certificationController = new CertificationController();
