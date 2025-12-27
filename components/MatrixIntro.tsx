'use client'

import { useState, useEffect, useCallback } from 'react'
import { trackEvent } from '@/lib/analytics'

interface MatrixIntroProps {
  onComplete: () => void
  hasSeenBefore?: boolean
}

const PHRASE_1 = "Don't trust."
const PHRASE_2 = "Verify..."
const FULL_TEXT = `${PHRASE_1} ${PHRASE_2}`

const INITIAL_WAIT = 2000    // 2s cursor blink before typing
const CHAR_DELAY = 80        // ms per character
const PAUSE_BETWEEN = 1000   // 1s pause between phrases
const AUTO_PROCEED = 10000   // 10s before auto-transition

type Phase = 'waiting' | 'typing1' | 'pause1' | 'typing2' | 'ready' | 'transitioning'

export default function MatrixIntro({ onComplete, hasSeenBefore }: MatrixIntroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState<Phase>('waiting')

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      // Skip animation for reduced motion - go straight to ready
      setDisplayedText(FULL_TEXT)
      setPhase('ready')
    }
  }, [])

  // Initial wait phase - 2 seconds of blinking cursor
  useEffect(() => {
    if (phase !== 'waiting' || prefersReducedMotion) return

    trackEvent('intro_started')

    const timeout = setTimeout(() => {
      setPhase('typing1')
    }, INITIAL_WAIT)

    return () => clearTimeout(timeout)
  }, [phase, prefersReducedMotion])

  // Typing phase 1: "Don't trust."
  useEffect(() => {
    if (phase !== 'typing1') return

    let charIndex = 0
    const interval = setInterval(() => {
      charIndex++
      setDisplayedText(PHRASE_1.slice(0, charIndex))

      if (charIndex >= PHRASE_1.length) {
        clearInterval(interval)
        setPhase('pause1')
      }
    }, CHAR_DELAY)

    return () => clearInterval(interval)
  }, [phase])

  // Pause between phrases
  useEffect(() => {
    if (phase !== 'pause1') return

    const timeout = setTimeout(() => {
      setPhase('typing2')
    }, PAUSE_BETWEEN)

    return () => clearTimeout(timeout)
  }, [phase])

  // Typing phase 2: "Verify..."
  useEffect(() => {
    if (phase !== 'typing2') return

    let charIndex = 0
    const interval = setInterval(() => {
      charIndex++
      setDisplayedText(PHRASE_1 + ' ' + PHRASE_2.slice(0, charIndex))

      if (charIndex >= PHRASE_2.length) {
        clearInterval(interval)
        setPhase('ready')
      }
    }, CHAR_DELAY)

    return () => clearInterval(interval)
  }, [phase])

  // Handle transition
  const handleProceed = useCallback(() => {
    if (phase !== 'ready') return

    trackEvent('intro_completed')
    setPhase('transitioning')

    setTimeout(() => {
      onComplete()
    }, 500)
  }, [phase, onComplete])

  // Handle skip (before ready)
  const handleSkip = useCallback(() => {
    if (phase === 'transitioning' || phase === 'ready') return

    trackEvent('intro_skipped', { phase })
    setPhase('transitioning')

    setTimeout(() => {
      onComplete()
    }, 500)
  }, [phase, onComplete])

  // Scroll listener and auto-proceed timer - only active when ready
  useEffect(() => {
    if (phase !== 'ready') return

    // Auto-proceed after 10 seconds
    const autoTimer = setTimeout(() => {
      handleProceed()
    }, AUTO_PROCEED)

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        handleProceed()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const startY = e.touches[0].clientY

      const handleTouchEnd = (endEvent: TouchEvent) => {
        const endY = endEvent.changedTouches[0].clientY
        if (startY - endY > 50) {
          handleProceed()
        }
        window.removeEventListener('touchend', handleTouchEnd)
      }

      window.addEventListener('touchend', handleTouchEnd)
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchstart', handleTouchStart)

    return () => {
      clearTimeout(autoTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [phase, handleProceed])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['Space', 'Enter', 'Escape'].includes(e.code)) {
        e.preventDefault()
        if (phase === 'ready') {
          handleProceed()
        } else if (phase !== 'transitioning') {
          handleSkip()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleProceed, handleSkip])

  const showCursor = phase !== 'transitioning'
  const isTypingPhase = phase === 'waiting' || phase === 'typing1' || phase === 'pause1' || phase === 'typing2'

  return (
    <div
      className={`
        fixed inset-0 z-[100] bg-zenon-bg flex flex-col items-center justify-center
        ${phase === 'transitioning' ? 'intro-fade-out' : ''}
      `}
      role="dialog"
      aria-label="Welcome intro"
    >
      {/* Terminal text - uses invisible full text for consistent width */}
      <div className="relative font-mono text-xl md:text-3xl px-6">
        {/* Invisible text to reserve space for centering */}
        <span className="invisible whitespace-pre">{FULL_TEXT}_</span>

        {/* Actual visible text overlaid */}
        <div
          className={`absolute inset-0 flex items-center ${phase === 'ready' ? 'cursor-pointer' : ''}`}
          onClick={phase === 'ready' ? handleProceed : undefined}
          aria-live="polite"
        >
          <span className="text-zenon-green whitespace-pre">
            {displayedText}
          </span>
          {showCursor && (
            <span className="cursor-blink text-zenon-green">_</span>
          )}
        </div>
      </div>

      {/* Skip link - only show during typing */}
      {isTypingPhase && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-zenon-text-muted hover:text-zenon-green text-sm font-mono transition-colors"
        >
          {hasSeenBefore ? 'press any key to skip' : 'skip'}
        </button>
      )}
    </div>
  )
}
