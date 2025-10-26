const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/comments`;

export const commentEndpoints = {
  createComment: () => `${BASE_URL}` as const,
  getComments: (postId: number) => `${BASE_URL}/posts/${postId}/comments` as const,
  updateComment: (commentId: number) => `${BASE_URL}/${commentId}` as const,
  deleteComment: (commentId: number) => `${BASE_URL}/${commentId}` as const,
};
