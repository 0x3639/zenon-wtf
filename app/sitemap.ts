import { MetadataRoute } from 'next'
import { cards } from '@/content/cards'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zenon.wtf'

  // Home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Card pages
  const cardRoutes: MetadataRoute.Sitemap = cards.map((card) => ({
    url: `${baseUrl}/${card.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...cardRoutes]
}
