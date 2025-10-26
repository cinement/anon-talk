import { commentEndpoints } from "./endpoints";

interface DeleteCommentRequest {
  nickname: string;
  password: string;
}

interface DeleteCommentResponse {
  id: number;
  boardId: number;
  postId: number;
  content: string;
  nickname: string;
  createdAt: string;
}

export async function deleteComment(commentId: number, request: DeleteCommentRequest): Promise<DeleteCommentResponse> {
  const response = await fetch(commentEndpoints.deleteComment(commentId), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
