'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  description: string
  date: string
  category: string
  coverImage?: string
  slug: string
  tags: string[]
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group"
    >
      <article
        className="
          group relative bg-background rounded-2xl 
          border border-gray-300 dark:border-gray-700
          p-6 transition-all flex flex-col justify-between h-full
          hover:shadow-lg hover:shadow-primary/20
          dark:hover:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-primary/30
        "
      >
        {/* Image */}
        {post.coverImage && (
          <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/blog/placeholder.jpg'
              }}
            />
          </div>
        )}

        {/* Upper content */}
        <div className="flex-grow">
          <div className="flex items-center gap-4 text-sm text-muted-foreground/80 mb-3">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.category}</span>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground/80 mb-6">
            {post.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary dark:bg-gray-800 dark:text-white/70 rounded-full text-sm transition-colors group-hover:bg-primary/70 group-hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
