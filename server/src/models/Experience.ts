import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Position / role is required'],
      trim: true
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
      trim: true
    },
    endDate: {
      type: String,
      required: [true, 'End date is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    technologies: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
