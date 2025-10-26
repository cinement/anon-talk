const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/posts`;

export const postEndpoints = {
  createPost: () => `${BASE_URL}` as const,
  getPosts: () => `${BASE_URL}` as const,
  getPost: (postId: number) => `${BASE_URL}/${postId}` as const,
  likePost: (postId: number) => `${BASE_URL}/${postId}/likes` as const,
  updatePost: (postId: number) => `${BASE_URL}/${postId}` as const,
  deletePost: (postId: number) => `${BASE_URL}/${postId}` as const,
};
