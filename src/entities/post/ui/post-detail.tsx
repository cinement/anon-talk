"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Post } from "../model";
import { useLikePost, useDeletePost } from "../api";
import { PostHeader } from "./post-header";
import { PostInfo } from "./post-info";
import { PostContent } from "./post-content";
import { PostActions } from "./post-actions";
import { DeletePostDialog } from "./delete-post-dialog";

interface PostDetailProps {
  post: Post;
  boardName: string;
  boardId: number;
}

export function PostDetail({ post, boardName, boardId }: PostDetailProps) {
  const { recCount, isLiking, handleLike } = useLikePost(post.id, post.recCount);
  const { isDeleting, handleDelete } = useDeletePost(post.id, boardId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("링크 복사에 실패했습니다");
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

      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
