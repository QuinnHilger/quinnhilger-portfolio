
import type { ReactNode } from "react";

export interface TechItem {
  name: string;
  icon?: ReactNode;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  link?: string;
  linkLabel?: string;
  youtubeId?: string;
  featured: boolean;
  status: "live" | "beta" | "showcase";
  overview: string;
  features: string[];
  tech: TechItem[];
  size: "large" | "tall" | "medium" | "small";
}

export interface TimelineEntry {
  id: string;
  type: "work" | "education";
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  accomplishments?: string[];
  logo: string;
  tech?: TechItem[];
}
