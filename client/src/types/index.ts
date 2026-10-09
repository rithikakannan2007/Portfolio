export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export interface Profile {
  _id?: string;
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
  github?: string;
  linkedin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface About {
  _id?: string;
  aboutDescription: string;
  personalInfo: string;
  careerObjective: string;
  interests: string;
  otherInfo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  percentage: number;
  level?: number;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  college?: string;
  startYear: string;
  endYear: string;
  year?: string;
  description: string;
  grade?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  role?: string;
  startDate: string;
  endDate: string;
  duration?: string;
  description: string;
  responsibilities?: string[];
  technologies: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certification {
  _id?: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  certificateId?: string;
  certificateUrl?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Achievement {
  _id?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  awardUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Resume {
  _id?: string;
  title: string;
  fileUrl: string;
  summary: string;
  lastUpdated: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface PortfolioSettings {
  _id?: string;
  siteTitle: string;
  metaDescription: string;
  primaryColor: string;
  enableContactForm: boolean;
  showResumeButton: boolean;
  customFooterText: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalEducation: number;
  totalExperience: number;
  totalCertifications: number;
  totalAchievements: number;
  totalServices: number;
  totalMessages: number;
  unreadMessages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  token?: string;
  user?: User;
}
