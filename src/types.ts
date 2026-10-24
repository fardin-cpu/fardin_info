export interface ToolItem {
  name: string;
  category?: string;
  iconType: 'fa' | 'lucide';
  iconValue: string; // FA class or Lucide icon name
  role: string;
}

export interface WorkItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  linkUrl?: string; // Link to your GitHub, Google Drive, Live Website, PDF, etc.
  linkLabel?: string; // E.g., 'View Project', 'Open GitHub', 'View PDF', 'Live Demo'
  deliverables?: string[];
  techStack?: string[];
  liveStatus?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  shortSummary: string;
  detailedOverview: string;
  iconName: string; // FA class or Lucide name
  accentColor: 'cyan' | 'purple' | 'blue' | 'emerald';
  isGeneralLiteracy: boolean;
  categoryLabel: string;
  directWorkUrl?: string; // Optional: direct external link for "View My Work" (e.g. GitHub, Google Drive)
  tools: ToolItem[];
  aiWorkflow: {
    badge: string;
    description: string;
    capabilities: string[];
  };
  workProjects: WorkItem[];
}
