import { commentEndpoints } from "./endpoints";

interface CreateCommentRequest {
  boardId: number;
  postId: number;
  content: string;
  nickname: string;
  password: string;
}

interface CreateCommentResponse {
  id: number;
  boardId: number;
  postId: number;
  content: string;
  nickname: string;
  createdAt: string;
}

export async function createComment(request: CreateCommentRequest): Promise<CreateCommentResponse> {
  const response = await fetch(commentEndpoints.createComment(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
