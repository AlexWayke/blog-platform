export interface ArticleType {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    avatar: string;
    following: boolean;
  };
}

export type postsResponse = {
  articles: ArticleType[];
  articlesCount: number;
};
