'use client'

import { useCallback } from 'react'
import { cards } from '@/content/cards'

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void
    }
  }
}

interface DotNavProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  activeIndex: number
}

export default function DotNav({ containerRef, activeIndex }: DotNavProps) {
  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return

    container.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    })
  }, [containerRef])

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
      {/* Connecting line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-zenon-text-muted/30 h-full" />

      {/* Progress line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-zenon-green transition-all duration-300 origin-top"
        style={{
          height: `${(activeIndex / (cards.length - 1)) * 100}%`,
        }}
      />

      {/* Dots */}
      <div className="relative flex flex-col gap-6">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => {
              window.posthog?.capture('nav_dot_clicked', { card_id: card.id, card_title: card.title })
              scrollToSection(index)
            }}
            className="group relative flex items-center"
            aria-label={`Navigate to ${card.title}`}
          >
            {/* Dot */}
            <div
              className={`
                w-3 h-3 rounded-full border-2 transition-all duration-300
                ${
                  index === activeIndex
                    ? 'bg-zenon-green border-zenon-green scale-125 glow-green'
                    : index < activeIndex
                    ? 'bg-zenon-green border-zenon-green'
                    : 'bg-transparent border-zenon-text-muted/50 hover:border-zenon-green/70'
                }
              `}
            />

            {/* Tooltip */}
            <span
              className={`
                absolute left-8 whitespace-nowrap px-3 py-1.5 rounded-md text-sm
                bg-zenon-bg-card border border-zenon-text-muted/20
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none
              `}
            >
              {card.title}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
