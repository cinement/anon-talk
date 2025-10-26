"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateComment } from "../api/use-create-comment";

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
  const {
    nickname,
    setNickname,
    password,
    setPassword,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
  } = useCreateComment({ postId, boardId, onSuccess });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-gray-800 p-4 space-y-3">
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
