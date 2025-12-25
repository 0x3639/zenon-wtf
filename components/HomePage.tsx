'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import DotNav from '@/components/DotNav'
import Card from '@/components/Card'
import { cards } from '@/content/cards'
import { trackEvent } from '@/lib/analytics'

interface HomePageProps {
  initialCardIndex?: number
}

export default function HomePage({ initialCardIndex = 0 }: HomePageProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(initialCardIndex)
  const currentIndexRef = useRef(currentIndex)
  const [copied, setCopied] = useState(false)
  const isInitialMount = useRef(true)

  // Keep ref in sync with state
  currentIndexRef.current = currentIndex

  const handleShare = async () => {
    const currentCard = cards[currentIndex]
    const url = `${window.location.origin}/${currentCard.id}`

    trackEvent('share_clicked', { card_id: currentCard.id, card_title: currentCard.title })

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const clampedIndex = Math.max(0, Math.min(index, cards.length - 1))
    container.scrollTo({
      top: clampedIndex * window.innerHeight,
      behavior: 'smooth',
    })
    setCurrentIndex(clampedIndex)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault()
        scrollToSection(currentIndexRef.current + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault()
        scrollToSection(currentIndexRef.current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToSection(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToSection(cards.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollToSection])

  // Sync current index with scroll and update URL path
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const sectionHeight = window.innerHeight
      const newIndex = Math.round(scrollTop / sectionHeight)
      const clampedIndex = Math.min(newIndex, cards.length - 1)
      setCurrentIndex(clampedIndex)

      // Update URL path without triggering navigation
      const cardId = cards[clampedIndex]?.id
      const newPath = cardId === 'welcome' ? '/' : `/${cardId}`
      if (cardId && pathname !== newPath) {
        window.history.replaceState(null, '', newPath)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Handle initial scroll position on mount
  useEffect(() => {
    if (isInitialMount.current && initialCardIndex > 0) {
      const container = containerRef.current
      if (container) {
        // Immediate scroll without animation on initial load
        container.scrollTo({
          top: initialCardIndex * window.innerHeight,
          behavior: 'instant',
        })
      }
      isInitialMount.current = false
    }
  }, [initialCardIndex])

  return (
    <main className="relative">
      {/* Left navigation dots */}
      <DotNav containerRef={containerRef} activeIndex={currentIndex} />

      {/* Scroll container with snap sections */}
      <div ref={containerRef} className="snap-container">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* Mobile progress bar - thin vertical bar on left */}
      <div className="fixed left-0 top-0 h-full w-1 z-50 md:hidden bg-zenon-text-muted/20">
        <div
          className="w-full bg-zenon-green transition-all duration-300"
          style={{
            height: `${((currentIndex + 1) / cards.length) * 100}%`,
          }}
        />
      </div>

      {/* Share button - bottom left */}
      <div className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-50">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 md:gap-2 text-zenon-text-muted hover:text-zenon-green transition-colors duration-200"
          title={copied ? 'Link copied!' : 'Share this card'}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs md:text-sm">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-xs md:text-sm">Share</span>
            </>
          )}
        </button>
      </div>

      {/* Zenon branding footer */}
      <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50">
        <a
          href="https://zenon.network"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('zenon_link_clicked')}
          className="flex items-center gap-1.5 md:gap-2 text-zenon-text-muted hover:text-zenon-green transition-colors duration-200"
        >
          <span className="text-xs md:text-sm hidden sm:inline">Powered by</span>
          <span className="text-zenon-green font-bold text-xs md:text-sm">ZENON</span>
        </a>
      </div>
    </main>
  )
}
