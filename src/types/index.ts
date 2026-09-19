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
  thumb?: string;
  lqip?: string;
  category: PortfolioCategory;
  badge?: string;
  tags?: string[];
}

export interface GloryImage {
  file: string;
  /** 高清 WebP，仅灯箱按需加载 */
  path: string;
  /** 列表用缩略 WebP */
  thumb: string;
  /** 24px 模糊占位图（data URI），实现渐进式加载 */
  lqip: string;
  caption: string;
  width: number;
  height: number;
}

export interface GloryItem {
  id: string;
  title: string;
  level: string;
  levelClass: string;
  meta: string;
  org: string;
  date: string;
  categoryZh: string;
  categoryEn: string;
  images: GloryImage[];
}

export interface GloryCategory {
  zh: string;
  en: string;
}

export interface GloryData {
  source: string;
  categories: GloryCategory[];
  items: GloryItem[];
  summary: {
    total: number;
    period: string;
    schools: string;
  };
}
