'use client'

import * as React from 'react'
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

interface BlogFilterProps {
  categories: string[]
  tags: string[]
  /** optional: dapat callback kalau mau filter dihandle di client tanpa reload */
  onChange?: (filters: {
    q: string
    categories: string[]
    tags: string[]
    sort: SortKey
  }) => void
}

export function BlogFilter({ categories, tags, onChange }: BlogFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // --- utils URL <-> array (aman untuk spasi/&/dll) ---
  const readArray = (key: string) => {
    const raw = searchParams.get(key)
    if (!raw) return []
    return raw.split(',').map(decodeURIComponent).filter(Boolean)
  }
  const writeArray = (arr: string[]) =>
    arr.length ? arr.map(encodeURIComponent).join(',') : null

  // --- state (sinkron dengan URL) ---
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(() => readArray('categories'))
  const [selectedTags, setSelectedTags] = React.useState<string[]>(() => readArray('tags'))
  const [query, setQuery] = React.useState<string>(() => searchParams.get('q') ?? '')
  const [sort, setSort] = React.useState<SortKey>(() => (searchParams.get('sort') as SortKey) || 'latest')

  // keep in sync kalau URL berubah via back/forward
  React.useEffect(() => {
    setSelectedCategories(readArray('categories'))
    setSelectedTags(readArray('tags'))
    setQuery(searchParams.get('q') ?? '')
    setSort((searchParams.get('sort') as SortKey) || 'latest')
  }, [searchParams])

  // --- router updater (replace biar ga numpuk history) ---
  const updateParams = React.useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null) params.delete(k)
      else params.set(k, v)
    })
    router.replace(`/blog?${params.toString()}`)
  }, [router, searchParams])

  // --- debounced search ---
  React.useEffect(() => {
    const id = setTimeout(() => {
      updateParams({ q: query || null })
      onChange?.({ q: query, categories: selectedCategories, tags: selectedTags, sort })
    }, 250)
    return () => clearTimeout(id)
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  // --- handlers ---
  const handleCategoriesChange = (vals: string[]) => {
    setSelectedCategories(vals)
    updateParams({ categories: writeArray(vals) })
    onChange?.({ q: query, categories: vals, tags: selectedTags, sort })
  }

  const handleTagsChange = (vals: string[]) => {
    setSelectedTags(vals)
    updateParams({ tags: writeArray(vals) })
    onChange?.({ q: query, categories: selectedCategories, tags: vals, sort })
  }

  const handleSortChange = (next: SortKey) => {
    setSort(next)
    updateParams({ sort: next })
    onChange?.({ q: query, categories: selectedCategories, tags: selectedTags, sort: next })
  }

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Categories */}
        <div className="flex-1">
          <Combobox
            options={categories.map(c => ({ value: c, label: c }))}
            value={selectedCategories}
            onChange={handleCategoriesChange}
            placeholder="Select categories..."
          />
        </div>

        {/* Tags */}
        <div className="flex-1">
          <Combobox
            options={tags.map(t => ({ value: t, label: t }))}
            value={selectedTags}
            onChange={handleTagsChange}
            placeholder="Select tags..."
          />
        </div>

        {/* Search + Sort */}
        <div className="flex items-center gap-2 sm:w-auto w-full">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
