export enum BlogPostCategory {
  TECHNOLOGY = "technology",
  LIFESTYLE = "lifestyle",
  TRAVEL = "travel",
  FINANCE = "finance",
  FOOD = "food",
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
