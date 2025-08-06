export interface Project {
  id: string;
  title: string;
  description: string;
  platform: 'minecraft' | 'roblox' | 'web' | 'mobile' | 'other';
  stage: 'concept' | 'development' | 'launched' | 'scaling';
  submissionDate: Date;
  contactInfo: ContactInfo;
  technicalDetails: TechnicalDetails;
  businessModel: BusinessModel;
}

export interface ContactInfo {
  name: string;
  email: string;
  discord?: string;
  company?: string;
  website?: string;
}

export interface TechnicalDetails {
  currentTech: string[];
  repositories?: string[];
  liveDemo?: string;
  documentation?: string;
  teamSize: number;
  timeline: string;
}

export interface BusinessModel {
  revenueModel: string;
  targetAudience: string;
  marketSize: string;
  competitiveAdvantage: string;
  fundingNeeded: number;
  expectedRevenue: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: 'technical' | 'strategic' | 'infrastructure' | 'community';
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  platform: string;
  revenue: number;
  users: number;
  launchDate: Date;
  technologies: string[];
  imageUrl: string;
  status: 'active' | 'completed' | 'sold';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedIn?: string;
  github?: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  projectName: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  projectType: 'investment' | 'partnership' | 'consultation' | 'other';
  budget?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
  backgroundImage?: string;
}