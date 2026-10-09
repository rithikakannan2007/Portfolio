import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Technologies list cannot be empty'
      }
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true,
      default: ''
    },
    liveUrl: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      default: 'Full-Stack',
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
