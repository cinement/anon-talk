"use client";

import { X } from "lucide-react";
import { formatDate } from "@/lib/date";
import type { Comment } from "../model";

interface CommentItemProps {
  comment: Comment;
  onDeleteClick?: (commentId: number) => void;
}

export function CommentItem({ comment, onDeleteClick }: CommentItemProps) {
  return (
    <div className="py-4 px-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-200">{comment.nickname}</span>
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
            {comment.content}
          </p>
        </div>

        {onDeleteClick && (
          <button
            onClick={() => onDeleteClick(comment.id)}
            className="p-1 text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
            aria-label="댓글 삭제"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
