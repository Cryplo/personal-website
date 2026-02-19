import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="flex flex-col min-h-[100dvh] p-6 sm:p-12 max-w-4xl mx-auto">
      <div className="space-y-8 w-full">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Dive into my thoughts
              </h2>
              <p className="text-muted-foreground text-base">
                A collection of musings, lessons, and stories from my journey in tech and beyond.
              </p>
            </div>
          </div>
        </BlurFade>
        <div className="space-y-2">
          {posts
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post, id) => (
              <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
                <Link
                  className="group flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors"
                  href={`/blog/${post.slug}`}
                >
                  <p className="text-lg font-medium tracking-tight group-hover:text-primary transition-colors">
                    {post.metadata.title}
                  </p>
                  <p className="text-sm text-muted-foreground shrink-0 ml-4">
                    {post.metadata.publishedAt}
                  </p>
                </Link>
              </BlurFade>
            ))}
        </div>
      </div>
    </main>
  );
}
