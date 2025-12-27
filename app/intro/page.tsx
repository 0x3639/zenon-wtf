import { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'Welcome to Zenon | Network of Momentum',
  description: 'Understanding Zenon Network of Momentum - A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
  alternates: {
    canonical: 'https://zenon.wtf/intro',
  },
  openGraph: {
    title: 'Welcome to Zenon | Network of Momentum',
    description: 'A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
    url: 'https://zenon.wtf/intro',
    siteName: 'Zenon Network',
    images: [
      {
        url: 'https://zenon.wtf/og/welcome.png',
        width: 1200,
        height: 630,
        alt: 'Welcome to Zenon',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to Zenon | Network of Momentum',
    description: 'A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
    images: ['https://zenon.wtf/og/welcome.png'],
  },
}

export default function IntroPage() {
  return <HomePage />
}
