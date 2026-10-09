import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
  title: string;
  fileUrl: string;
  summary: string;
  lastUpdated: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema = new Schema<IResume>(
  {
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
      default: 'Software Engineer Resume'
    },
    fileUrl: {
      type: String,
      required: [true, 'Resume file URL is required'],
      trim: true
    },
    summary: {
      type: String,
      default: '',
      trim: true
    },
    lastUpdated: {
      type: String,
      default: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
  },
  {
    timestamps: true
  }
);

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema);
