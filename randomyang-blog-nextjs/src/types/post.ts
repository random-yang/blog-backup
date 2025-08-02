export interface PostMeta {
  title: string;
  date: string;
  tags?: string[];
  categories?: string[];
  description?: string;
  cover?: string;
  top?: boolean;
  author?: string;
}

export interface Post extends PostMeta {
  slug: string;
  content: string;
  excerpt?: string;
  readingTime?: number;
}