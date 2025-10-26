"use client";

import Link from "next/link";
import type { Board } from "../model/board";

interface BoardTabsProps {
  boards: Board[];
  currentBoardId: number;
}

export function BoardTabs({ boards, currentBoardId }: BoardTabsProps) {
  return (
    <div className="w-full border-b border-gray-800">
      <div className="flex">
        {boards.map((board) => {
          const isActive = board.id === currentBoardId;

          return isActive ? <ActiveTab key={board.id} board={board} /> : <InactiveTab key={board.id} board={board} />;
        })}
      </div>
    </div>
  );
}

function ActiveTab({ board }: { board: Board }) {
  return (
    <Link
      href={`/board/${board.id}`}
      className="flex-1 px-6 py-4 border-b-2 border-b-white text-white font-medium text-center transition-colors"
    >
      {board.name}
    </Link>
  );
}

function InactiveTab({ board }: { board: Board }) {
  return (
    <Link
      href={`/board/${board.id}`}
      className="flex-1 px-6 py-4 border-b-2 border-b-transparent text-gray-400 hover:text-gray-200 text-center transition-colors"
    >
      {board.name}
    </Link>
  );
}
