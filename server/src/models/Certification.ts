import mongoose, { Document, Schema } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  certificateId?: string;
  certificateUrl?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema<ICertification>(
  {
    name: {
      type: String,
      required: [true, 'Certification name is required'],
      trim: true
    },
    issuingOrganization: {
      type: String,
      required: [true, 'Issuing organization is required'],
      trim: true
    },
    issueDate: {
      type: String,
      required: [true, 'Issue date is required'],
      trim: true
    },
    certificateId: {
      type: String,
      default: '',
      trim: true
    },
    certificateUrl: {
      type: String,
      default: '',
      trim: true
    },
    image: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Certification = mongoose.model<ICertification>('Certification', CertificationSchema);
