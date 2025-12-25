import { Metadata } from 'next'
import { cards } from '@/content/cards'
import HomePage from '@/components/HomePage'

interface PageProps {
  params: Promise<{ cardId: string }>
}

export async function generateStaticParams() {
  return cards.map((card) => ({
    cardId: card.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cardId } = await params
  const card = cards.find((c) => c.id === cardId)

  if (!card) {
    return {
      title: 'Zenon Network',
      description: 'Understanding Zenon Network of Momentum',
    }
  }

  const title = `${card.title} | Zenon`
  const description = card.description || card.subtitle

  return {
    title,
    description,
    alternates: {
      canonical: `https://zenon.wtf/${card.id}`,
    },
    openGraph: {
      title: card.title,
      description,
      url: `https://zenon.wtf/${card.id}`,
      siteName: 'Zenon Network',
      images: [
        {
          url: `https://zenon.wtf/og/${card.id}.png`,
          width: 1200,
          height: 630,
          alt: card.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: card.title,
      description,
      images: [`https://zenon.wtf/og/${card.id}.png`],
    },
  }
}

export default async function CardPage({ params }: PageProps) {
  const { cardId } = await params
  const initialIndex = cards.findIndex((c) => c.id === cardId)

  return <HomePage initialCardIndex={initialIndex >= 0 ? initialIndex : 0} />
}
