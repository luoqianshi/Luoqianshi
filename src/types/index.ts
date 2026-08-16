export interface ProfileData {
  name: { zh: string; en: string };
  alias: { zh: string; en: string };
  identity: string;
  bio: string;
  links: Record<string, { label: string; url: string }>;
}

export type PortfolioCategory = 'featured' | 'others' | 'knowledge';

export interface PortfolioItem {
  name: string;
  description: string;
  website: string;
  github: string;
  image: string;
  category: PortfolioCategory;
  badge?: string;
  tags?: string[];
}

export interface AwardItem {
  title: string;
  organization: string;
  category: string;
  date: string;
  image: string;
}
