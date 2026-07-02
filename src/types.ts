export interface Project {
  id: string;
  title: string;
  description: string;
  extendedDescription: string;
  category: 'AI & Systems' | 'Cyber Security & Networks' | 'Innovative Tech';
  tags: string[];
  emoji: string;
  outcomes: string[];
  role: string;
  tools: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface HackathonMilestone {
  id: string;
  title: string;
  event: string;
  year: string;
  award?: string;
  description: string;
  extendedDescription: string;
  outcomes: string[];
  icon: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  summary: string;
  fullDetails: string;
  emoji: string;
  subfields: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; proficiency: number; description: string }[];
}
