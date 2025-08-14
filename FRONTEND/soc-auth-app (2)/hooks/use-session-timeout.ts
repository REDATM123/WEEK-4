"use client"

import { useState, useEffect, useCallback } from "react"
import { getTimeUntilExpiry, type SessionData } from "@/lib/session"

const WARNING_TIME = 5 * 60 * 1000 // Show warning 5 minutes before expiry

export function useSessionTimeout(session: SessionData | null, onSessionExpired: () => void) {
  const [showWarning, setShowWarning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const checkSession = useCallback(() => {
    if (!session) {
      setShowWarning(false)
      return
    }

    const remaining = getTimeUntilExpiry(session)
    setTimeRemaining(remaining)

    if (remaining <= 0) {
      setShowWarning(false)
      onSessionExpired()
    } else if (remaining <= WARNING_TIME && !showWarning) {
      setShowWarning(true)
    } else if (remaining > WARNING_TIME && showWarning) {
      setShowWarning(false)
    }
  }, [session, showWarning, onSessionExpired])

  useEffect(() => {
    const interval = setInterval(checkSession, 1000)
    return () => clearInterval(interval)
  }, [checkSession])

  const dismissWarning = useCallback(() => {
    setShowWarning(false)
  }, [])

  return {
    showWarning,
    timeRemaining,
    dismissWarning,
  }
}
