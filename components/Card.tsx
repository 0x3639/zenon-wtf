'use client'

import { useEffect, useRef, useState } from 'react'
import { CardData, REPO_BASE_URL, GITBOOK_BASE_URL } from '@/content/cards'

interface CardProps {
  card: CardData
  index: number
}

export default function Card({ card, index }: CardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        if (visible) {
          setIsVisible(true)
        }
        setIsInView(visible)

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

  const repoUrl = `${REPO_BASE_URL}/${card.repoPath}`
  const gitbookUrl = card.gitbookPath
    ? `${GITBOOK_BASE_URL}/${card.gitbookPath}`
    : GITBOOK_BASE_URL

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
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-zenon-green/20 transition-all duration-300 hover:scale-[1.02]"
            style={{
              boxShadow: '0 0 40px rgba(127, 255, 0, 0.08), 0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-auto"
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
          style={{
            boxShadow: '0 0 40px rgba(127, 255, 0, 0.08), 0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
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
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1 md:gap-2 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-md md:rounded-lg
                border border-zenon-text-muted/30 text-zenon-text text-xs md:text-base
                hover:border-zenon-green/50 hover:text-zenon-green transition-colors duration-200
              "
            >
              <span>Source</span>
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
