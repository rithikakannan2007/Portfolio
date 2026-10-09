import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Experience } from '../models/Experience';
import { Certification } from '../models/Certification';
import { Achievement } from '../models/Achievement';
import { Service } from '../models/Service';
import { Message } from '../models/Message';

export class DashboardController {
  public async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const [
        totalProjects,
        totalSkills,
        totalEducation,
        totalExperience,
        totalCertifications,
        totalAchievements,
        totalServices,
        totalMessages,
        unreadMessages
      ] = await Promise.all([
        Project.countDocuments(),
        Skill.countDocuments(),
        Education.countDocuments(),
        Experience.countDocuments(),
        Certification.countDocuments(),
        Achievement.countDocuments(),
        Service.countDocuments(),
        Message.countDocuments(),
        Message.countDocuments({ isRead: false })
      ]);

      res.status(200).json({
        success: true,
        data: {
          totalProjects,
          totalSkills,
          totalEducation,
          totalExperience,
          totalCertifications,
          totalAchievements,
          totalServices,
          totalMessages,
          unreadMessages
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
