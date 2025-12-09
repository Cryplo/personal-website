export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl px-6 w-full" style={{ marginLeft: '50px', marginRight: '50px' }}>
      {children}
    </div>
  );
}
