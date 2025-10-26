const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1`;

export const commentEndpoints = {
  createComment: () => `${BASE_URL}/comments` as const,
  getComments: (postId: number) => `${BASE_URL}/posts/${postId}/comments` as const,
  updateComment: (commentId: number) => `${BASE_URL}/comments/${commentId}` as const,
  deleteComment: (commentId: number) => `${BASE_URL}/comments/${commentId}` as const,
};
