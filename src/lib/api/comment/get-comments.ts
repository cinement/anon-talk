import { commentEndpoints } from "./endpoints";
import { SortObject } from "../types";

interface GetCommentsParams {
  page?: number;
  size?: number;
  sort?: string;
}

interface GetCommentsResponse {
  data: CommentItem[];
  page?: number;
  size?: number;
  totalPage: number;
  totalCount: number;
  sort: SortObject;
}

interface CommentItem {
  id: number;
  boardId: number;
  postId: number;
  content: string;
  nickname: string;
  createdAt: string;
}

export async function getComments(postId: number, params?: GetCommentsParams): Promise<GetCommentsResponse> {
  const response = await fetch(getCommentsUrl(postId, params));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function getCommentsUrl(postId: number, params?: GetCommentsParams) {
  const searchParams = new URLSearchParams({
    postId: postId.toString(),
  });

  if (params?.page != null) {
    searchParams.set("page", params.page.toString());
  }
  if (params?.size != null) {
    searchParams.set("size", params.size.toString());
  }
  if (params?.sort != null) {
    searchParams.set("sort", params.sort);
  }

  if (searchParams.toString()) {
    return `${commentEndpoints.getComments(postId)}?${searchParams.toString()}` as const;
  }

  return `${commentEndpoints.getComments(postId)}` as const;
}
