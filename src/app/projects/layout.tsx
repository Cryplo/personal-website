export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-none px-6"  style={{ marginLeft: '50px', marginRight: '50px' }}>
      {children}
    </div>
  );
}
