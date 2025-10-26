"use client";

import { ThumbsUp, Share2 } from "lucide-react";

interface PostActionsProps {
  recCount: number;
  onLike?: () => void;
  onShare?: () => void;
}

export function PostActions({ recCount, onLike, onShare }: PostActionsProps) {
  return (
    <div className="flex items-center gap-6 px-4 py-4 border-t border-gray-800">
      <button
        onClick={onLike}
        className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
      >
        <ThumbsUp className="w-5 h-5" />
        <span className="text-sm font-medium">추천 {recCount}</span>
      </button>

      <button
        onClick={onShare}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-medium">공유</span>
      </button>
    </div>
  );
}
