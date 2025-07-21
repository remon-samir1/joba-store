export async function generateStaticParams() {
  const posts = [
    { slug: 'post-1' },
    { slug: 'post-2' },
    { slug: 'post-3' },
    // Add more post slugs as needed for static generation
  ];

  return posts;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
} 