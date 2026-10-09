import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true
    },
    icon: {
      type: String,
      default: 'laptop',
      trim: true
    },
    features: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
