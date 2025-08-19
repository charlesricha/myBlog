export interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorImage: string;
  date: string;
  tags: string[];
  coverImage: string;
  content: string; // Markdown
}

export interface Comment {
  id: number;
  postId: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Like {
  postId: string;
  count: number;
}
