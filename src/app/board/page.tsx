import { getBoards } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function BoardIndexPage() {
  const boards = await getBoards();

  if (boards.length > 0) {
    redirect(`/board/${boards[0].id}`);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-gray-500">게시판이 없습니다</p>
    </div>
  );
}
