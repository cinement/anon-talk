import { postEndpoints } from "./endpoints";
import { SortObject } from "../types";

interface GetPostsParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface GetPostsResponse {
  data: PostItem[];
  page?: number;
  size?: number;
  totalPage: number;
  totalCount: number;
  sort: SortObject;
}

interface PostItem {
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

export async function getPosts(boardId: number, params?: GetPostsParams): Promise<GetPostsResponse> {
  const response = await fetch(getPostsUrl(boardId, params));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function getPostsUrl(boardId: number, params?: GetPostsParams) {
  const searchParams = new URLSearchParams({
    boardId: boardId.toString(),
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
    return `${postEndpoints.getPosts()}?${searchParams.toString()}` as const;
  }

  return `${postEndpoints.getPosts()}?${searchParams.toString()}` as const;
}
