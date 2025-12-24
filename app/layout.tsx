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
  description: 'Understanding Zenon Network of Momentum - A new paradigm for decentralized systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-montserrat antialiased">
        {children}
      </body>
    </html>
  )
}
