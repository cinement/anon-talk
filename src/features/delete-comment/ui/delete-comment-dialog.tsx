"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DeleteCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (nickname: string, password: string) => Promise<void>;
  isDeleting: boolean;
}

export function DeleteCommentDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteCommentDialogProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!nickname.trim() || !password.trim()) {
      setError("닉네임과 비밀번호를 입력해주세요");
      return;
    }

    try {
      await onConfirm(nickname, password);
      handleCancel();
    } catch (err) {
      setError("삭제 권한이 없거나 비밀번호가 일치하지 않습니다");
    }
  };

  const handleCancel = () => {
    setNickname("");
    setPassword("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">댓글 삭제</DialogTitle>
          <DialogDescription className="text-gray-400">
            삭제하려면 작성 시 입력한 닉네임과 비밀번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comment-nickname" className="text-gray-200">
              닉네임
            </Label>
            <Input
              id="comment-nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              disabled={isDeleting}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-password" className="text-gray-200">
              비밀번호
            </Label>
            <Input
              id="comment-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isDeleting}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
