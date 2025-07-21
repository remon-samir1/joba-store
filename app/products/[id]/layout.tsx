export async function generateStaticParams() {
  const products = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    // Add more product IDs as needed for static generation
  ];

  return products;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
} 