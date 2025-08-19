// src/app/blog/page.tsx
import { BlogFilter } from '@/components/blog-filter'
import PostCard from '@/components/post-card'
import { getAllPosts } from "@/lib/markdown"
import type { PostMetadata } from '@/lib/markdown'

export default function BlogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const posts: PostMetadata[] = getAllPosts()

  const searchQuery = (typeof searchParams.q === "string" ? searchParams.q : "").toLowerCase()
  const selectedCategories = typeof searchParams.categories === "string"
    ? searchParams.categories.split(",").map(c => c.toLowerCase())
    : []
  const selectedTags = typeof searchParams.tags === "string"
    ? searchParams.tags.split(",").map(t => t.toLowerCase())
    : []

  // --- sort key (default latest) ---
  const sortKey = typeof searchParams.sort === "string" ? searchParams.sort : "latest"

  // --- filter posts ---
  const filteredPosts = posts.filter(post => {
    // Search filter
    if (searchQuery) {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery)))

      if (!matchesSearch) return false
    }

    // Categories filter
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(post.category.toLowerCase())) {
        return false
      }
    }

    // Tags filter
    if (selectedTags.length > 0) {
      if (!selectedTags.every(tag =>
        post.tags?.some(postTag => postTag.toLowerCase() === tag)
      )) {
        return false
      }
    }

    return true
  })

  // --- apply sorting ---
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortKey) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "az":
        return a.title.localeCompare(b.title)
      case "za":
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  // ambil semua kategori & tags unik
  const categories = Array.from(new Set(posts.map(p => p.category)))
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])))

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Blog</h1>

      {/* Filters (Client Component) */}
      <BlogFilter categories={categories} tags={allTags} />

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* No Results */}
      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No posts found for the selected filters.
          </p>
        </div>
      )}
    </div>
  )
}
