"use client"
import { useEffect, useState } from "react"

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number>(0)

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then(res => res.json())
      .then(data => setViews(data.views))
  }, [slug])

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      👀 {views} views
    </span>
  )
}
