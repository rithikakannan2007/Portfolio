import { Project, IProject } from '../models/Project';

export class ProjectService {
  public async getAllProjects(): Promise<IProject[]> {
    return await Project.find().sort({ createdAt: -1 });
  }

  public async getProjectById(id: string): Promise<IProject | null> {
    return await Project.findById(id);
  }

  public async createProject(data: Partial<IProject>): Promise<IProject> {
    const project = new Project(data);
    return await project.save();
  }

  public async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  public async deleteProject(id: string): Promise<IProject | null> {
    return await Project.findByIdAndDelete(id);
  }
}

export const projectService = new ProjectService();
