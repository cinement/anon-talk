"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { CreatePostDialog } from "./create-post-dialog";
import type { Board } from "@/entities/board";

interface CreatePostButtonProps {
  boards: Board[];
  defaultBoardId: number;
}

export function CreatePostButton({
  boards,
  defaultBoardId,
}: CreatePostButtonProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      {/* Floating Write Button */}
      <button
        onClick={() => setIsCreateDialogOpen(true)}
        className="fixed right-6 bottom-6 p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors z-50"
        aria-label="글쓰기"
      >
        <Pencil className="w-6 h-6" />
      </button>

      {/* Create Post Dialog */}
      <CreatePostDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        boards={boards}
        defaultBoardId={defaultBoardId}
      />
    </>
  );
}
