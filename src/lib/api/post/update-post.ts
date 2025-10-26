import { postEndpoints } from "./endpoints";

interface UpdatePostRequest {
  title: string;
  content: string;
  nickname: string;
  password: string;
}

interface UpdatePostResponse {
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

export async function updatePost(postId: number, request: UpdatePostRequest): Promise<UpdatePostResponse> {
  const response = await fetch(postEndpoints.updatePost(postId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
