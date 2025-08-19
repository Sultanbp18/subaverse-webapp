'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import { Combobox } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

type SortKey = 'latest' | 'oldest' | 'az' | 'za'

interface ProjectFilterProps {
  categories: string[]
  tags: string[]
}

export function ProjectFilter({ categories, tags }: ProjectFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategories = searchParams.get('categories')?.split(',') || []
  const currentTags = searchParams.get('tags')?.split(',') || []
  const searchQuery = searchParams.get('q') || ''
  const sort = (searchParams.get('sort') as SortKey) || 'latest'

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    router.push(`/projects?${params.toString()}`)
  }

  const handleCategoriesChange = (selectedCategories: string[]) => {
    updateParams({
      categories: selectedCategories.length > 0 ? selectedCategories.join(',') : null,
    })
  }

  const handleTagsChange = (selectedTags: string[]) => {
    updateParams({
      tags: selectedTags.length > 0 ? selectedTags.join(',') : null,
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateParams({ q: value || null })
  }

  const handleSortChange = (next: SortKey) => {
    updateParams({ sort: next })
  }

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Categories */}
        <div className="flex-1">
          <Combobox
            options={categories.map((category) => ({
              value: category.toLowerCase(),
              label: category,
            }))}
            value={currentCategories}
            onChange={handleCategoriesChange}
            placeholder="Select categories..."
          />
        </div>

        {/* Tags */}
        <div className="flex-1">
          <Combobox
            options={tags.map((tag) => ({
              value: tag.toLowerCase(),
              label: tag,
            }))}
            value={currentTags}
            onChange={handleTagsChange}
            placeholder="Select tags..."
          />
        </div>

        {/* Search + Sort */}
        <div className="flex items-center gap-2 sm:w-auto w-full">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" title="Sort">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-background shadow-md">
              <DropdownMenuItem onClick={() => handleSortChange('latest')}>
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('oldest')}>
                Oldest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('az')}>
                Title A–Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('za')}>
                Title Z–A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}