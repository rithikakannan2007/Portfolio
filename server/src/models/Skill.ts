import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  percentage: number;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Technical'
    },
    percentage: {
      type: Number,
      required: [true, 'Percentage / proficiency level is required'],
      min: [1, 'Skill percentage must be at least 1%'],
      max: [100, 'Skill percentage cannot exceed 100%']
    },
    icon: {
      type: String,
      default: 'check-circle'
    }
  },
  {
    timestamps: true
  }
);

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
