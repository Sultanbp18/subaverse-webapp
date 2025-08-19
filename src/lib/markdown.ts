import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMetadata {
  id: string
  title: string
  date: string
  category: string
  description: string
  coverImage?: string
  slug: string
  tags: string[] // Make tags required
}

export interface Post extends PostMetadata {
  content: string
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id: slug, // Use slug as id since it's unique
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    description: data.description,
    coverImage: data.coverImage,
    tags: data.tags || [],
    content,
  }
}

export function getAllPosts(): PostMetadata[] {
  const slugs = fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      return {
        id: post.slug,
        title: post.title,
        date: post.date,
        category: post.category,
        description: post.description,
        coverImage: post.coverImage,
        slug: post.slug,
        tags: post.tags || [] // Ensure tags is always an array
      }
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true }) // izinkan HTML di tree
    .use(rehypeRaw) // parse raw HTML dari markdown
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}