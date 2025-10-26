import type { Post } from "../model";
import { PostListItem } from "./post-list-item";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts = [] }: PostListProps) {
  return (
    <div className="divide-y divide-gray-800">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
