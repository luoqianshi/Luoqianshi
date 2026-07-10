export interface ProfileData {
  name: { zh: string; en: string };
  alias: { zh: string; en: string };
  identity: string;
  bio: string;
  links: Record<string, { label: string; url: string }>;
}

export interface PortfolioItem {
  name: string;
  description: string;
  website: string;
  github: string;
  image: string;
  tags: string[];
}

export interface AwardItem {
  title: string;
  organization: string;
  category: string;
  date: string;
}
