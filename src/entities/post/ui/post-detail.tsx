"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Post } from "../model";
import { useLikePost } from "@/features/like-post";
import { useDeletePost, DeletePostDialog } from "@/features/delete-post";
import { useComments, CommentList } from "@/entities/comment";
import { CreateCommentForm } from "@/features/create-comment";
import { useDeleteComment, DeleteCommentDialog } from "@/features/delete-comment";
import { PostHeader } from "./post-header";
import { PostInfo } from "./post-info";
import { PostContent } from "./post-content";
import { PostActions } from "./post-actions";

interface PostDetailProps {
  post: Post;
  boardName: string;
  boardId: number;
}

export function PostDetail({ post, boardName, boardId }: PostDetailProps) {
  const { recCount, isLiking, handleLike } = useLikePost(post.id, post.recCount);
  const { isDeleting, handleDelete } = useDeletePost(post.id, boardId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 댓글 관련 상태
  const { comments, refetch: refetchComments } = useComments(post.id);
  const { isDeleting: isDeletingComment, handleDelete: handleDeleteComment } = useDeleteComment(refetchComments);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("링크 복사에 실패했습니다");
    }
  };

  const handleCommentDeleteClick = (commentId: number) => {
    setDeleteCommentId(commentId);
  };

  const handleCommentDeleteConfirm = async (nickname: string, password: string) => {
    if (deleteCommentId) {
      await handleDeleteComment(deleteCommentId, nickname, password);
    }
  };

  return (
    <div>
      <PostHeader
        boardName={boardName}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
      />
      <PostInfo nickname={post.nickname} createdAt={post.createdAt} />
      <PostContent title={post.title} content={post.content} />
      <PostActions
        recCount={recCount}
        isLiking={isLiking}
        onLike={handleLike}
        onShare={handleShare}
      />

      {/* 댓글 섹션 */}
      <div className="mt-6">
        <h3 className="px-4 py-3 text-lg font-semibold text-white border-t border-gray-800">
          댓글 ({comments.length})
        </h3>
        <CommentList comments={comments} onDeleteClick={handleCommentDeleteClick} />
        <CreateCommentForm
          postId={post.id}
          boardId={boardId}
          onSuccess={refetchComments}
        />
      </div>

      {/* 게시글 삭제 다이얼로그 */}
      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      {/* 댓글 삭제 다이얼로그 */}
      <DeleteCommentDialog
        open={deleteCommentId !== null}
        onOpenChange={(open) => !open && setDeleteCommentId(null)}
        onConfirm={handleCommentDeleteConfirm}
        isDeleting={isDeletingComment}
      />
    </div>
  );
}
