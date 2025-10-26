"use client";

import { CommentItem } from "./comment-item";
import type { Comment } from "../model/types";

interface CommentListProps {
  comments: Comment[];
  onDeleteClick?: (commentId: number) => void;
}

export function CommentList({ comments, onDeleteClick }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        첫 번째 댓글을 작성해보세요
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-800">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}
