import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioSettings extends Document {
  siteTitle: string;
  metaDescription: string;
  primaryColor: string;
  enableContactForm: boolean;
  showResumeButton: boolean;
  customFooterText: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSettingsSchema: Schema = new Schema<IPortfolioSettings>(
  {
    siteTitle: {
      type: String,
      default: 'Alex Morgan | Full-Stack Developer'
    },
    metaDescription: {
      type: String,
      default: 'Professional Full-Stack Developer Portfolio showcasing web applications, skills, and credentials.'
    },
    primaryColor: {
      type: String,
      default: '#6366f1'
    },
    enableContactForm: {
      type: Boolean,
      default: true
    },
    showResumeButton: {
      type: Boolean,
      default: true
    },
    customFooterText: {
      type: String,
      default: 'Built with React, TypeScript, Express & MongoDB'
    }
  },
  {
    timestamps: true
  }
);

export const PortfolioSettings = mongoose.model<IPortfolioSettings>('PortfolioSettings', PortfolioSettingsSchema);
