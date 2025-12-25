import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zenon.wtf'),
  title: {
    default: 'Zenon Network | Network of Momentum',
    template: '%s | Zenon',
  },
  description: 'Understanding Zenon Network of Momentum - A new paradigm for decentralized systems with feeless transactions, parallel execution, and browser-based nodes.',
  keywords: ['Zenon', 'Network of Momentum', 'blockchain', 'feeless', 'decentralized', 'cryptocurrency', 'ZNN', 'QSR', 'dual-ledger', 'DAG'],
  authors: [{ name: 'Zenon Network' }],
  creator: 'Zenon Network',
  publisher: 'Zenon Network',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#7fff00',
    'msapplication-TileColor': '#0d1117',
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zenon Network',
  description: 'Understanding Zenon Network of Momentum - A new paradigm for decentralized systems',
  url: 'https://zenon.wtf',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://zenon.wtf/{search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-montserrat antialiased">
        {children}
      </body>
    </html>
  )
}
