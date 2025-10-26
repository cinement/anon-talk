import { getBoards, getPosts } from "@/lib/api";
import { BoardTabs } from "@/entities/board/ui";
import { PostList } from "@/entities/post";
import { notFound } from "next/navigation";

interface BoardPageProps {
  params: Promise<{ boardId: string }>;
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
  }>;
}

const INITIAL_PARAMS = {
  boardId: "1",
};

const DEFAULT_PARAMS = {
  page: "0",
  size: "10",
  sort: "createdAt,desc",
};

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const { boardId = INITIAL_PARAMS.boardId } = await params;
  const { page = DEFAULT_PARAMS.page, size = DEFAULT_PARAMS.size, sort = DEFAULT_PARAMS.sort } = await searchParams;

  const [boards, posts] = await Promise.all([
    getBoards(),
    getPosts(Number(boardId), { page: Number(page), size: Number(size), sort }),
  ]);

  const board = boards.find((b) => b.id === Number(boardId));
  if (!board) {
    notFound();
  }

  return (
    <>
      <BoardTabs boards={boards} currentBoardId={Number(boardId)} />
      <PostList posts={posts.data} />
    </>
  );
}
