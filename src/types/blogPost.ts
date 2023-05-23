export enum BlogPostCategory {
  TECHNOLOGY = "technology",
  LIFESTYLE = "lifestyle",
  TRAVEL = "travel",
  FINANCE = "finance",
  FOOD = "food",
}

export enum BlogPostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface ListBlogPost {
  id: string;
  title: string;
  categories: BlogPostCategory[];
  score: number;
  author: ListBlogPostAuthor;
}

export interface ListBlogPostAuthor {
  id: string;
}

export interface DetailsBlogPost {
  id: string;
  title: string;
  categories: BlogPostCategory[];
  score: number;
  content: string;
  author: DetailsBlogPostAuthor;
}

export interface DetailsBlogPostAuthor {
  id: string;
}
