import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill';

export class SkillController {
  public async getAllSkills(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const skills = await Skill.find().sort({ category: 1, percentage: -1 });
      res.status(200).json({
        success: true,
        count: skills.length,
        data: skills
      });
    } catch (error) {
      next(error);
    }
  }

  public async getSkillById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const skill = await Skill.findById(req.params.id);
      if (!skill) {
        res.status(404).json({ success: false, message: 'Skill not found' });
        return;
      }
      res.status(200).json({ success: true, data: skill });
    } catch (error) {
      next(error);
    }
  }

  public async createSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, category, percentage, icon } = req.body;
      const newSkill = await Skill.create({
        name,
        category: category || 'General',
        percentage: Number(percentage) || 80,
        icon: icon || 'check-circle'
      });
      res.status(201).json({
        success: true,
        message: 'Skill added successfully',
        data: newSkill
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedSkill) {
        res.status(404).json({ success: false, message: 'Skill not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Skill updated successfully',
        data: updatedSkill
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
      if (!deletedSkill) {
        res.status(404).json({ success: false, message: 'Skill not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Skill deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const skillController = new SkillController();
