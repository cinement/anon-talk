"use client";

import Link from "next/link";
import type { Post } from "../model";
import { formatDate } from "@/lib/utils/date";

interface PostListItemProps {
  post: Post;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/board/${post.boardId}/post/${post.id}`} className="block p-4 hover:bg-gray-900 transition-colors">
      <PostTitle title={post.title} commentCount={post.commentCount} />

      <PostMeta
        nickname={post.nickname}
        createdAt={post.createdAt}
        viewCount={post.viewCount}
        recCount={post.recCount}
      />
    </Link>
  );
}

function PostTitle({ title, commentCount }: { title: string; commentCount: number }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-gray-100">
        {title} {commentCount > 0 && <span className="text-blue-400">[{commentCount}]</span>}
      </h3>
    </div>
  );
}

function PostMeta({
  nickname,
  createdAt,
  viewCount,
  recCount,
}: {
  nickname: string;
  createdAt: string;
  viewCount: number;
  recCount: number;
}) {
  return (
    <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
      <span>{nickname}</span>
      <span>|</span>
      <span>{formatDate(createdAt)}</span>
      <span>|</span>
      <span>조회 {viewCount}</span>
      <span>|</span>
      <span>추천 {recCount}</span>
    </div>
  );
}
