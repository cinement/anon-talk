import { commentEndpoints } from "./endpoints";

interface UpdateCommentRequest {
  content: string;
  nickname: string;
  password: string;
}

interface UpdateCommentResponse {
  id: number;
  boardId: number;
  postId: number;
  content: string;
  nickname: string;
  createdAt: string;
}

export async function updateComment(commentId: number, request: UpdateCommentRequest): Promise<UpdateCommentResponse> {
  const response = await fetch(commentEndpoints.updateComment(commentId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
