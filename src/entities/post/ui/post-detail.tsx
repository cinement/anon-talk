"use client";

import { useState } from "react";
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

  return (
    <div>
      <PostHeader
        boardName={boardName}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
      />
      <PostInfo nickname={post.nickname} createdAt={post.createdAt} />
      <PostContent title={post.title} content={post.content} />
      <PostActions recCount={recCount} isLiking={isLiking} onLike={handleLike} />

      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
