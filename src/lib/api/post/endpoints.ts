const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/posts`;

export const postEndpoints = {
  createPost: () => `${BASE_URL}` as const,
  getPosts: (boardId: number) => `${BASE_URL}/boards/${boardId}/posts` as const,
  getPost: (postId: number) => `${BASE_URL}/${postId}` as const,
  likePost: (postId: number) => `${BASE_URL}/${postId}/likes` as const,
  updatePost: (postId: number) => `${BASE_URL}/${postId}` as const,
  deletePost: (postId: number) => `${BASE_URL}/${postId}` as const,
};
