import { Suspense } from 'react'
import { projects } from '@/lib/projects'
import type { Project } from '@/types'
import { ProjectFilter } from '@/components/project-filter'
import ProjectCard from '@/components/project-card'
import ProjectsClient from '@/components/projects/projects-client'

export default function ProjectsPage() {
  // derive static categories & tags on server
  const categories: string[] = Array.from(new Set(projects.map((p: Project) => p.category)))
  const allTags: string[] = Array.from(new Set(projects.flatMap((p: Project) => p.tags)))

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Projects</h1>

      {/* Suspense-wrapped client filtering */}
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsClient categories={categories} tags={allTags} projects={projects as Project[]} />
      </Suspense>
    </div>
  )
}
