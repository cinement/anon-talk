"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostHeaderProps {
  boardName: string;
  onDeleteClick?: () => void;
}

export function PostHeader({ boardName, onDeleteClick }: PostHeaderProps) {
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-2 -mr-2 hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="더보기"
            >
              <MoreVertical className="w-6 h-6 text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-800">
            <DropdownMenuItem
              onClick={onDeleteClick}
              className="text-red-400 hover:text-red-300 hover:bg-gray-800 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
