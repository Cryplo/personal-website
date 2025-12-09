export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Break out of parent max-w-2xl constraint using calc
  return (
    <div
      className="w-[calc(100vw-100px)]"
      style={{
        marginLeft: 'calc(-50vw + 50% + 50px)',
        marginRight: 'calc(-50vw + 50% + 50px)',
      }}
    >
      {children}
    </div>
  );
}
