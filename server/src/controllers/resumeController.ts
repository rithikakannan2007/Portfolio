import { Request, Response, NextFunction } from 'express';
import { Resume } from '../models/Resume';

export class ResumeController {
  public async getResume(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let resume = await Resume.findOne();
      if (!resume) {
        resume = await Resume.create({
          title: 'Full-Stack Software Engineer Resume',
          fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          summary:
            'Software Engineer with experience in React, TypeScript, Node.js, Express, MongoDB, and Cloud infrastructure.',
          lastUpdated: 'October 2026'
        });
      }
      res.status(200).json({ success: true, data: resume });
    } catch (error) {
      next(error);
    }
  }

  public async updateResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let resume = await Resume.findOne();
      if (resume) {
        Object.assign(resume, req.body);
        await resume.save();
      } else {
        resume = await Resume.create(req.body);
      }
      res.status(200).json({
        success: true,
        message: 'Resume information updated successfully',
        data: resume
      });
    } catch (error) {
      next(error);
    }
  }
}

export const resumeController = new ResumeController();
