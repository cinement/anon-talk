"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical } from "lucide-react";

interface PostHeaderProps {
  boardName: string;
}

export function PostHeader({ boardName }: PostHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-black border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-900 rounded-lg transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h1 className="text-lg font-medium text-white">{boardName}</h1>

        <button
          className="p-2 -mr-2 hover:bg-gray-900 rounded-lg transition-colors"
          aria-label="더보기"
        >
          <MoreVertical className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  );
}
