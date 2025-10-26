"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createComment } from "@/lib/api";

interface UseCreateCommentParams {
  postId: number;
  boardId: number;
  onSuccess?: () => void;
}

export function useCreateComment({
  postId,
  boardId,
  onSuccess,
}: UseCreateCommentParams) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("댓글을 입력해주세요");
      return false;
    }

    if (!password.trim()) {
      toast.error("비밀번호를 입력해주세요");
      return false;
    }

    try {
      setIsSubmitting(true);
      await createComment({
        boardId,
        postId,
        content: content.trim(),
        nickname: nickname.trim() || "익명",
        password: password.trim(),
      });

      // 성공 시 폼 초기화
      setNickname("");
      setPassword("");
      setContent("");
      toast.success("댓글이 등록되었습니다");

      // 댓글 목록 새로고침
      onSuccess?.();
      return true;
    } catch (error) {
      toast.error("댓글 등록에 실패했습니다");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    nickname,
    setNickname,
    password,
    setPassword,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
  };
}
