import { Request, Response, NextFunction } from 'express';
import { About } from '../models/About';

export class AboutController {
  public async getAbout(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let about = await About.findOne();
      if (!about) {
        about = await About.create({
          aboutDescription:
            'I am a dedicated Full-Stack Engineer with strong expertise in architecting resilient web platforms, building accessible UI interfaces, and developing scalable microservices.',
          personalInfo:
            'Based in San Francisco, CA. Passionate about software craftsmanship, open source technologies, and mentoring budding developers.',
          careerObjective:
            'To drive technical excellence and deliver high-impact digital solutions by combining modern cloud infrastructure with intuitive frontend applications.',
          interests: 'Distributed computing, reactive user interfaces, API architecture, cybersecurity, and cloud automation.',
          otherInfo: 'Available for both technical leadership and hands-on full-stack development roles.'
        });
      }
      res.status(200).json({ success: true, data: about });
    } catch (error) {
      next(error);
    }
  }

  public async updateAbout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let about = await About.findOne();
      if (about) {
        Object.assign(about, req.body);
        await about.save();
      } else {
        about = await About.create(req.body);
      }
      res.status(200).json({
        success: true,
        message: 'About section updated successfully',
        data: about
      });
    } catch (error) {
      next(error);
    }
  }
}

export const aboutController = new AboutController();
