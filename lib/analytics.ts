declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void
    }
  }
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(event, properties)
    }
  } catch {
    // Silently fail if PostHog isn't available
  }
}
