"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "../api/use-create-post";
import type { Board } from "@/entities/board";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boards: Board[];
  defaultBoardId?: number;
}

export function CreatePostDialog({
  open,
  onOpenChange,
  boards,
  defaultBoardId,
}: CreatePostDialogProps) {
  const {
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
  } = useCreatePost({ boards, defaultBoardId, onClose: () => onOpenChange(false) });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-800 pb-4">
          <DialogTitle className="text-xl font-bold text-white">글쓰기</DialogTitle>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6 py-4">
          {/* 게시판 선택 */}
          <div className="space-y-2">
            <Label className="text-gray-200">게시판</Label>
            <div className="flex gap-2">
              {boards.map((board) => (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => setSelectedBoardId(board.id)}
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 ${
                    selectedBoardId === board.id
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  {board.name}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200">
              제목 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              disabled={isSubmitting}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* 닉네임 */}
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-gray-200">
              닉네임
            </Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="익명"
              disabled={isSubmitting}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">
              비밀번호 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              disabled={isSubmitting}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-200">
              내용
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              disabled={isSubmitting}
              rows={10}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-white text-black hover:bg-gray-200">
              {isSubmitting ? "작성 중..." : "작성완료"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
