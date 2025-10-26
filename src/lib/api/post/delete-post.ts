import { postEndpoints } from "./endpoints";

interface DeletePostRequest {
  nickname: string;
  password: string;
}

export async function deletePost(postId: number, request: DeletePostRequest): Promise<void> {
  const response = await fetch(postEndpoints.deletePost(postId), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
