"use client";

import type { Post } from "../model";
import { useLikePost } from "../api";
import { PostHeader } from "./post-header";
import { PostInfo } from "./post-info";
import { PostContent } from "./post-content";
import { PostActions } from "./post-actions";

interface PostDetailProps {
  post: Post;
  boardName: string;
}

export function PostDetail({ post, boardName }: PostDetailProps) {
  const { recCount, isLiking, handleLike } = useLikePost(post.id, post.recCount);

  return (
    <div>
      <PostHeader boardName={boardName} />
      <PostInfo nickname={post.nickname} createdAt={post.createdAt} />
      <PostContent title={post.title} content={post.content} />
      <PostActions recCount={recCount} isLiking={isLiking} onLike={handleLike} />
    </div>
  );
}
