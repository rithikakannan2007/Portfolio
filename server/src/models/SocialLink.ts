import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLink extends Document {
  platform: string;
  url: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema: Schema = new Schema<ISocialLink>(
  {
    platform: {
      type: String,
      required: [true, 'Platform name is required'],
      trim: true
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true
    },
    icon: {
      type: String,
      default: 'globe',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const SocialLink = mongoose.model<ISocialLink>('SocialLink', SocialLinkSchema);
