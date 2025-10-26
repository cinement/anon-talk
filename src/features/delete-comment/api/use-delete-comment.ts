"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteComment } from "@/lib/api";

export function useDeleteComment(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (
    commentId: number,
    nickname: string,
    password: string
  ) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteComment(commentId, { nickname, password });
      toast.success("댓글이 삭제되었습니다");
      onSuccess?.();
    } catch (error) {
      toast.error("댓글 삭제에 실패했습니다");
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
