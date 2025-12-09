export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl px-6 w-full mx-auto">
      {children}
    </div>
  );
}
