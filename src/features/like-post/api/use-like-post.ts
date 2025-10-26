"use client";

import { useState } from "react";
import { likePost } from "@/lib/api";

export function useLikePost(postId: number, initialRecCount: number) {
  const [recCount, setRecCount] = useState(initialRecCount);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      // 낙관적 업데이트
      setRecCount((prev) => prev + 1);

      const response = await likePost(postId);
      // 서버 응답으로 실제 값 업데이트
      setRecCount(response.recCount);
    } catch (error) {
      // 에러 시 롤백
      setRecCount((prev) => prev - 1);
      console.error("Failed to like post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return {
    recCount,
    isLiking,
    handleLike,
  };
}
