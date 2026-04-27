
export type PricingType = "Free" | "Freemium" | "Paid";
export type ToolStatus = "Testing" | "In Daily Use" | "Strategic Priority";

export interface AIAgent {
  id: string;
  name: string;
  field: string;
  shortDescription: string;
  longDescription: string;
  useCases: string[];
  pricing: PricingType;
  rating: number;
  reviewsCount: number;
  tags: string[];
  toolLink: string;
  featured: boolean;
}

export interface Review {
  id: string;
  agentId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SavedTool {
  agentId: string;
  status: ToolStatus;
  addedAt: string;
}

export interface User {
  email: string;
  role: 'user' | 'admin';
  membership: 'explorer' | 'pioneer' | 'navigator';
  fieldPreference?: string;
}

export interface Field {
  id: string;
  name: string;
  icon: string;
  description: string;
}
