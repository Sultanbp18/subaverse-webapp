'use client'

import { useSearchParams } from 'next/navigation'
import { ProjectFilter } from '@/components/project-filter'
import ProjectCard from '@/components/project-card'
import type { Project } from '@/types'

interface ProjectsClientProps {
  categories: string[]
  tags: string[]
  projects: Project[]
}

export default function ProjectsClient({ categories, tags, projects }: ProjectsClientProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')?.toLowerCase() || ''
  const selectedCategories = searchParams.get('categories')?.split(',').filter(Boolean) || []
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || []
  const sortKey = searchParams.get('sort') || 'latest'

  // Filter projects
  const filteredProjects = projects.filter((project: Project) => {
    if (searchQuery) {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      if (!matchesSearch) return false
    }

    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(project.category.toLowerCase())) {
        return false
      }
    }

    if (selectedTags.length > 0) {
      if (!selectedTags.every(tag =>
        project.tags.some(projectTag => projectTag.toLowerCase() === tag)
      )) {
        return false
      }
    }

    return true
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortKey) {
      case "latest":
        return b.id.localeCompare(a.id)
      case "oldest":
        return a.id.localeCompare(b.id)
      case "az":
        return a.title.localeCompare(b.title)
      case "za":
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return (
    <div>
      <ProjectFilter categories={categories} tags={tags} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProjects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No projects found for the selected filters.
          </p>
        </div>
      )}
    </div>
  )
}