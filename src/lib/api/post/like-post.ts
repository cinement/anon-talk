import { postEndpoints } from "./endpoints";

interface LikePostResponse {
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

export async function likePost(postId: number): Promise<LikePostResponse> {
  const response = await fetch(postEndpoints.likePost(postId), {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
