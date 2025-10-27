export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
  linkedin?: string;
  portfolio?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
}
