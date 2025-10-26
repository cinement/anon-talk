export interface Comment {
  id: number;
  boardId: number;
  postId: number;
  content: string;
  nickname: string;
  createdAt: string;
}

export interface CommentListParams {
  page?: number;
  size?: number;
  sort?: string;
}
