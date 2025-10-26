import { getPost, getBoards } from "@/lib/api";
import { PostDetail } from "@/entities/post";
import { notFound } from "next/navigation";

// 동적 렌더링 강제 (실시간 익명 게시판)
export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{
    boardId: string;
    postId: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { boardId, postId } = await params;
  const [boards, post] = await Promise.all([getBoards(), getPost(Number(postId))]);

  const board = boards.find((b) => b.id === Number(boardId));
  if (!board) {
    notFound();
  }

  return (
    <>
      <PostDetail post={post} boardName={board.name} />
    </>
  );
}
