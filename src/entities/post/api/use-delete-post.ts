"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/api";

export function useDeletePost(postId: number, boardId: number) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (nickname: string, password: string) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      setError(null);

      await deletePost(postId, { nickname, password });

      router.push(`/board/${boardId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제에 실패했습니다");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    error,
    handleDelete,
  };
}
