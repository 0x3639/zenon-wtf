import { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'Zenon Network | Network of Momentum',
  description: 'Understanding Zenon Network of Momentum - A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
  openGraph: {
    title: 'Zenon Network | Network of Momentum',
    description: 'A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
    url: 'https://zenon.wtf',
    siteName: 'Zenon Network',
    images: [
      {
        url: 'https://zenon.wtf/og/welcome.png',
        width: 1200,
        height: 630,
        alt: 'Zenon Network',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenon Network | Network of Momentum',
    description: 'A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
    images: ['https://zenon.wtf/og/welcome.png'],
  },
}

export default function Home() {
  return <HomePage />
}
