'use client'

import { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react'
import { CardData, GITBOOK_BASE_URL } from '@/content/cards'
import { trackEvent } from '@/lib/analytics'

interface CardProps {
  card: CardData
  index: number
}

function Card({ card, index }: CardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        if (visible) {
          setIsVisible(true)
        }

        // Pause video when scrolling away
        if (!visible && card.videoEmbed && iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            JSON.stringify({ method: 'pause' }),
            '*'
          )
        }
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [card.videoEmbed])

  const gitbookUrl = useMemo(
    () => (card.gitbookPath ? `${GITBOOK_BASE_URL}/${card.gitbookPath}` : GITBOOK_BASE_URL),
    [card.gitbookPath]
  )

  const trackClick = useCallback((event: string) => {
    trackEvent(event, { card_id: card.id, card_title: card.title })
  }, [card.id, card.title])

  // Quote card (centered text only)
  if (card.isQuoteCard) {
    return (
      <section
        ref={cardRef}
        id={card.id}
        className="snap-section flex items-center justify-center px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: card.bgColor || 'transparent' }}
      >
        <div
          className={`
            max-w-3xl w-full text-center transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-2xl md:text-5xl font-bold text-zenon-text mb-4 md:mb-6 italic">
            {card.title}
          </h2>
          <p className="text-zenon-green text-lg md:text-2xl font-medium">
            {card.subtitle}
          </p>
        </div>
      </section>
    )
  }

  // Image card (clickable image linking to external URL)
  if (card.isImageCard && card.imageSrc) {
    return (
      <section
        ref={cardRef}
        id={card.id}
        className="snap-section flex items-center justify-center px-4 md:px-16 lg:px-24"
        style={{ backgroundColor: card.bgColor || 'transparent' }}
      >
        <div
          className={`
            max-w-2xl w-full transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <a
            href={card.imageLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('image_card_clicked')}
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-zenon-green/20 transition-all duration-300 hover:scale-[1.02]"
            style={{ boxShadow: 'var(--card-shadow)' }}
          >
            <img
              src={card.imageSrc}
              alt={card.title}
              loading="lazy"
              className="w-auto h-auto max-h-[50vh] md:max-h-[70vh] mx-auto"
            />
          </a>
        </div>
      </section>
    )
  }

  // Video-only card (first page)
  if (card.videoEmbed) {
    return (
      <section
        ref={cardRef}
        id={card.id}
        className="snap-section flex items-center justify-center px-4 md:px-8"
        style={{ backgroundColor: card.bgColor || 'transparent' }}
      >
        <div
          className={`
            relative w-full max-w-6xl transition-all duration-700
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          {/* Responsive video container - 16:9 aspect ratio */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              ref={iframeRef}
              src={card.videoEmbed}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center mt-6 animate-bounce">
            <span className="text-zenon-text-muted text-sm mb-2">Scroll to explore</span>
            <svg className="w-6 h-6 text-zenon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
    )
  }

  // Standard content card
  return (
    <section
      ref={cardRef}
      id={card.id}
      className="snap-section flex items-center justify-center px-4 md:px-16 lg:px-24 py-16 md:py-8"
      style={{ backgroundColor: card.bgColor || 'transparent' }}
    >
      <div
        className={`
          max-w-3xl w-full transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{ transitionDelay: '100ms' }}
      >
        {/* Card Number - hidden on mobile */}
        <div className="mb-2 md:mb-6 hidden md:block">
          <span className="text-zenon-green text-5xl font-light opacity-30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content Card */}
        <div
          className="bg-zenon-bg-card backdrop-blur-sm border border-zenon-green/20 rounded-xl md:rounded-2xl p-5 md:p-12 shadow-lg"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          {/* Subtitle */}
          <p className="text-zenon-green text-xs md:text-sm font-medium tracking-wider uppercase mb-1 md:mb-2">
            {card.subtitle}
          </p>

          {/* Title */}
          <h2 className="text-xl md:text-4xl font-bold text-zenon-text mb-3 md:mb-6">
            {card.title}
          </h2>

          {/* Description */}
          <p className="text-zenon-text-muted text-sm md:text-lg leading-relaxed mb-4 md:mb-8">
            {card.description}
          </p>

          {/* Key Points */}
          {card.keyPoints.length > 0 && (
            <ul className="space-y-2 md:space-y-3 mb-5 md:mb-10">
              {card.keyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 md:gap-3 text-zenon-text/90 text-sm md:text-base"
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <span className="text-zenon-green text-xs md:text-base">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Links */}
          <div className="flex gap-2 md:gap-4">
            <a
              href={gitbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('docs_clicked')}
              className="
                inline-flex items-center gap-1 md:gap-2 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-md md:rounded-lg
                bg-zenon-green text-zenon-bg font-medium text-xs md:text-base
                hover:bg-zenon-green-dark transition-colors duration-200
              "
            >
              <span>Docs</span>
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Card)
