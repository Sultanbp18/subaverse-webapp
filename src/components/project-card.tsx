'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: string
  link?: string
  github?: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Prioritas: buka GitHub jika ada, kalau tidak, buka link biasa
  const targetUrl = project.github || project.link || '#'

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative bg-background rounded-2xl
        border border-gray-300 dark:border-gray-700
        p-6 transition-all flex flex-col justify-between h-full
        hover:shadow-lg hover:shadow-primary/20
        dark:hover:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-primary/30
      "
    >
      {/* Top section: title + category */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {/* Category badge */}
        <span className="inline-flex items-center rounded-full bg-accent/60 px-2.5 py-0.5 text-xs font-medium text-white-800">
          {project.category}
        </span>
      </div>

      {/* Middle section: description */}
      <p className="text-muted-foreground/80">{project.description}</p>

      {/* Bottom section: tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/10 text-primary dark:bg-gray-800 dark:text-white/70 rounded-full text-sm transition-colors group-hover:bg-primary/70 group-hover:text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}
