"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/lib/api";
import type { Post, PostListParams } from "../model";

interface UsePostsResult {
  data: Post[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  totalPage: number;
}

export function usePosts(boardId: number, params?: PostListParams): UsePostsResult {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await getPosts(boardId, params);
        if (mounted) {
          setData(response.data);
          setTotalCount(response.totalCount);
          setTotalPage(response.totalPage);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch posts"));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, [boardId, params?.page, params?.size, params?.sort]);

  return { data, isLoading, error, totalCount, totalPage };
}
