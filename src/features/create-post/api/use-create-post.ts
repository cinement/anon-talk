"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPost } from "@/lib/api";
import type { Board } from "@/entities/board";

interface UseCreatePostParams {
  boards: Board[];
  defaultBoardId?: number;
  onClose: () => void;
}

export function useCreatePost({
  boards,
  defaultBoardId,
  onClose,
}: UseCreatePostParams) {
  const router = useRouter();
  const [selectedBoardId, setSelectedBoardId] = useState(
    defaultBoardId || boards[0]?.id
  );
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요");
      return false;
    }

    if (!password.trim()) {
      toast.error("비밀번호를 입력해주세요");
      return false;
    }

    if (!content.trim()) {
      toast.error("내용을 입력해주세요");
      return false;
    }

    try {
      setIsSubmitting(true);
      const post = await createPost({
        boardId: selectedBoardId,
        title: title.trim(),
        content: content.trim(),
        nickname: nickname.trim() || "익명",
        password: password.trim(),
      });

      toast.success("게시글이 작성되었습니다");
      onClose();
      router.push(`/board/${selectedBoardId}/post/${post.id}`);
      router.refresh();
      return true;
    } catch (error) {
      toast.error("게시글 작성에 실패했습니다");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setTitle("");
    setNickname("");
    setPassword("");
    setContent("");
    onClose();
  };

  return {
    selectedBoardId,
    setSelectedBoardId,
    title,
    setTitle,
    nickname,
    setNickname,
    password,
    setPassword,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
    handleClose,
  };
}
