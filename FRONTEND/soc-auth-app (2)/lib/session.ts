export interface SessionData {
  user: any
  loginTime: number
  lastActivity: number
  expiresAt: number
}

const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes in milliseconds
const SESSION_KEY = "soc_session"

export const createSession = (user: any): SessionData => {
  const now = Date.now()
  return {
    user,
    loginTime: now,
    lastActivity: now,
    expiresAt: now + SESSION_TIMEOUT,
  }
}

export const getSession = (): SessionData | null => {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (!stored) return null

    const session: SessionData = JSON.parse(stored)

    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      clearSession()
      return null
    }

    return session
  } catch {
    clearSession()
    return null
  }
}

export const updateSession = (session: SessionData): SessionData => {
  const now = Date.now()
  const updatedSession = {
    ...session,
    lastActivity: now,
    expiresAt: now + SESSION_TIMEOUT,
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession))
  }

  return updatedSession
}

export const storeSession = (session: SessionData): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const clearSession = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_KEY)
}

export const isSessionValid = (session: SessionData | null): boolean => {
  if (!session) return false
  return Date.now() < session.expiresAt
}

export const getTimeUntilExpiry = (session: SessionData | null): number => {
  if (!session) return 0
  return Math.max(0, session.expiresAt - Date.now())
}
