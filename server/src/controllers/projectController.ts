import { Request, Response, NextFunction } from 'express';
import { projectService } from '../services/projectService';

export class ProjectController {
  public async getAllProjects(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (error) {
      next(error);
    }
  }

  public async getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);
      if (!project) {
        res.status(404).json({
          success: false,
          message: `Project not found with id: ${id}`
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  public async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProject = await projectService.createProject(req.body);
      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: newProject
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updatedProject = await projectService.updateProject(id, req.body);
      if (!updatedProject) {
        res.status(404).json({
          success: false,
          message: `Project not found with id: ${id}`
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deletedProject = await projectService.deleteProject(id);
      if (!deletedProject) {
        res.status(404).json({
          success: false,
          message: `Project not found with id: ${id}`
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const projectController = new ProjectController();
