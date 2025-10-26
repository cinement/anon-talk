"use client";

import { useEffect, useState } from "react";
import { getPost } from "@/lib/api";
import type { Post } from "../model";

interface UsePostDetailResult {
  post: Post | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePostDetail(postId: number): UsePostDetailResult {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await getPost(postId);
      setPost(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch post"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return {
    post,
    isLoading,
    error,
    refetch: fetchPost,
  };
}
