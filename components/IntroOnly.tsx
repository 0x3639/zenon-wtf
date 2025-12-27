'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MatrixIntro from '@/components/MatrixIntro'

const STORAGE_KEY = 'zenon-intro-seen'

export default function IntroOnly() {
  const router = useRouter()
  const [hasSeenBefore, setHasSeenBefore] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        if (data.seen) {
          setHasSeenBefore(true)
        }
      }
    } catch {
      // localStorage not available
    }
  }, [])

  const handleComplete = () => {
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        seen: true,
        timestamp: Date.now()
      }))
    } catch {
      // localStorage not available
    }

    // Navigate to /intro
    router.push('/intro')
  }

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return <div className="fixed inset-0 bg-zenon-bg" />
  }

  return (
    <MatrixIntro
      onComplete={handleComplete}
      hasSeenBefore={hasSeenBefore}
    />
  )
}
