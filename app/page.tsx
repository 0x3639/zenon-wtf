import { Metadata } from 'next'
import IntroOnly from '@/components/IntroOnly'

export const metadata: Metadata = {
  title: 'Zenon Network | Network of Momentum',
  description: "Don't trust. Verify. Enter the Network of Momentum - a new paradigm for decentralized systems.",
  alternates: {
    canonical: 'https://zenon.wtf',
  },
  openGraph: {
    title: 'Zenon Network | Network of Momentum',
    description: "Don't trust. Verify. Enter the Network of Momentum.",
    url: 'https://zenon.wtf',
    siteName: 'Zenon Network',
    images: [
      {
        url: 'https://zenon.wtf/og/intro.png',
        width: 1200,
        height: 630,
        alt: "Don't trust. Verify...",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenon Network | Network of Momentum',
    description: "Don't trust. Verify. Enter the Network of Momentum.",
    images: ['https://zenon.wtf/og/intro.png'],
  },
}

export default function Home() {
  return <IntroOnly />
}
