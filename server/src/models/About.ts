import mongoose, { Document, Schema } from 'mongoose';

export interface IAbout extends Document {
  aboutDescription: string;
  personalInfo: string;
  careerObjective: string;
  interests: string;
  otherInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema: Schema = new Schema<IAbout>(
  {
    aboutDescription: {
      type: String,
      required: [true, 'About description is required'],
      trim: true
    },
    personalInfo: {
      type: String,
      required: [true, 'Personal info is required'],
      trim: true
    },
    careerObjective: {
      type: String,
      required: [true, 'Career objective is required'],
      trim: true
    },
    interests: {
      type: String,
      required: [true, 'Technical interests are required'],
      trim: true
    },
    otherInfo: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const About = mongoose.model<IAbout>('About', AboutSchema);
