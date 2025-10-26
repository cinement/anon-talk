export interface Post {
  id: number;
  boardId: number;
  title: string;
  content: string;
  nickname: string;
  recCount: number;
  viewCount: number;
  commentCount: number;
  createdAt: string;
}

export interface PostListParams {
  page?: number;
  size?: number;
  sort?: string;
}
