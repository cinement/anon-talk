"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createComment } from "@/lib/api";

interface CreateCommentFormProps {
  postId: number;
  boardId: number;
  onSuccess?: () => void;
}

export function CreateCommentForm({
  postId,
  boardId,
  onSuccess,
}: CreateCommentFormProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("댓글을 입력해주세요");
      return;
    }

    if (!password.trim()) {
      toast.error("비밀번호를 입력해주세요");
      return;
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
    } catch (error) {
      toast.error("댓글 등록에 실패했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          disabled={isSubmitting}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          disabled={isSubmitting}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력해주세요"
        disabled={isSubmitting}
        rows={3}
        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 resize-none"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-gray-200"
      >
        {isSubmitting ? "등록 중..." : "등록"}
      </Button>
    </form>
  );
}
