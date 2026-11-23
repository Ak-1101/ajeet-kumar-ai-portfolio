export type ProjectStatus = 'completed' | 'concept' | 'prototype' | 'mentored' | 'in_progress';
export type DocumentVisibility = 'public' | 'private';
export type BlogStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  tagline: string;
  short_bio: string;
  detailed_bio?: string;
  teaching_philosophy?: string;
  career_journey?: string;
  career_vision?: string;
  avatar_url: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  cv_url: string;
  is_available_for_hire: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  deployment_details?: string | null;
  role: string;
  location?: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  display_order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  university?: string;
  location?: string;
  start_year: string;
  end_year: string;
  grade?: string;
  honors?: string;
  certificate_url?: string;
  display_order: number;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  proficiency_level: string; // e.g. "Advanced", "Proficient", "Core"
  featured: boolean;
  display_order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  problem_statement?: string;
  solution?: string;
  detailed_explanation?: string;
  category: string;
  status: ProjectStatus;
  technologies: string[];
  thumbnail_url?: string;
  github_url?: string;
  live_url?: string;
  demo_video_url?: string;
  featured: boolean;
  display_order: number;
}

export interface Research {
  id: string;
  title: string;
  conference_name: string;
  conference_dates: string;
  location: string;
  publishing_partner?: string;
  authors: string;
  abstract?: string;
  paper_url?: string;
  certificate_url?: string;
  display_order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuing_organization: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  certificate_file_url?: string;
  badge_details?: string;
  display_order: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  file_url: string;
  file_size?: string;
  is_current_cv: boolean;
  visibility: DocumentVisibility;
  featured: boolean;
  download_count: number;
  created_at?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  category_id?: string;
  category_name?: string;
  status: BlogStatus;
  is_journal: boolean;
  is_private: boolean;
  featured: boolean;
  reading_time_minutes: number;
  views: number;
  published_at: string;
  scheduled_at?: string;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  alt_text?: string;
  file_type: 'image' | 'video' | 'pdf' | 'document';
  mime_type?: string;
  file_url: string;
  file_size?: number;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  inquiry_type: 'Professional' | 'Collaboration' | 'Training' | 'General';
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  current_cv_id?: string;
  contact_email: string;
  contact_phone?: string;
  linkedin_url?: string;
  github_url?: string;
  maintenance_mode: boolean;
}
