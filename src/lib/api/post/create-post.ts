import { postEndpoints } from "./endpoints";

interface CreatePostRequest {
  boardId: number;
  title: string;
  content: string;
  nickname: string;
  password: string;
}

interface CreatePostResponse {
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

export async function createPost(request: CreatePostRequest): Promise<CreatePostResponse> {
  const response = await fetch(postEndpoints.createPost(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
