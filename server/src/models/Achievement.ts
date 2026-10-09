import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  organization: string;
  date: string;
  description: string;
  awardUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema: Schema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    awardUrl: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const Achievement = mongoose.model<IAchievement>('Achievement', AchievementSchema);
