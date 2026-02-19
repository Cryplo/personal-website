export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-8 sm:px-12 py-12">
      {children}
    </div>
  );
}
