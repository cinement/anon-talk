export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
