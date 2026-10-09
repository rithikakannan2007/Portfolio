import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  description: string;
  grade?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true
    },
    institution: {
      type: String,
      required: [true, 'Institution is required'],
      trim: true
    },
    startYear: {
      type: String,
      required: [true, 'Start year is required'],
      trim: true
    },
    endYear: {
      type: String,
      required: [true, 'End year is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    grade: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Education = mongoose.model<IEducation>('Education', EducationSchema);
