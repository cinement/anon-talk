import { formatDate } from "@/lib/utils/date";

interface PostInfoProps {
  nickname: string;
  createdAt: string;
}

export function PostInfo({ nickname, createdAt }: PostInfoProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400">
      <span>{nickname}</span>
      <span>|</span>
      <span>{formatDate(createdAt)}</span>
    </div>
  );
}
