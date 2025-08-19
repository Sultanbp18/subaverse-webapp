import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, markdownToHtml } from '@/lib/markdown';
import Image from 'next/image';
import ViewCounter from "@/components/view-counter";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  return {
    title: `${post.title} - Subaverse Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);

  return (
    <article className="relative w-full">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full h-[450px] relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.category}</span>
            <span>•</span>
            {/* 👇 Tambahkan ini */}
            <ViewCounter slug={post.slug} />
          </div>

          <h1 className="text-5xl font-bold mb-4 leading-tight text-black dark:text-white">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {post.description}
          </p>
        </header>

        <div
          className="prose prose-lg prose-quoteless dark:prose-invert max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}
