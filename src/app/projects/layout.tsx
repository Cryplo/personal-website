export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-8 sm:px-12 pt-16 sm:pt-24 pb-12">
      {children}
    </div>
  );
}
