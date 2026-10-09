import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  shortIntro: string;
  bio?: string;
  profileImage: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  location?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: [true, 'Profile name is required'],
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true
    },
    shortIntro: {
      type: String,
      required: [true, 'Short introduction is required'],
      trim: true
    },
    bio: {
      type: String,
      default: ''
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    },
    resumeUrl: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'Available for work'
    }
  },
  {
    timestamps: true
  }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
