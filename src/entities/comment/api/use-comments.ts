"use client";

import { useState, useEffect } from "react";
import { getComments } from "@/lib/api";
import type { Comment, CommentListParams } from "../model/types";

export function useComments(postId: number, params?: CommentListParams) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await getComments(postId, params);
      setComments(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch comments"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return {
    comments,
    isLoading,
    error,
    refetch: fetchComments,
  };
}
