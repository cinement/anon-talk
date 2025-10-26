import { postEndpoints } from "./endpoints";

interface GetPostResponse {
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

export async function getPost(postId: number): Promise<GetPostResponse> {
  const response = await fetch(postEndpoints.getPost(postId));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
