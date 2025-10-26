interface PostContentProps {
  title: string;
  content: string;
}

export function PostContent({ title, content }: PostContentProps) {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  );
}
