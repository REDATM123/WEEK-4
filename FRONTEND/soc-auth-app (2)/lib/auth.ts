export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "analyst" | "viewer"
}

// Demo users for testing
export const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@soc.com",
    name: "Administrateur SOC",
    role: "admin",
  },
  {
    id: "2",
    email: "analyst@soc.com",
    name: "Analyste Sécurité",
    role: "analyst",
  },
  {
    id: "3",
    email: "viewer@soc.com",
    name: "Observateur",
    role: "viewer",
  },
]

export const authenticateUser = (email: string, password: string): User | null => {
  // Simple demo authentication - in production, this would be server-side
  const user = DEMO_USERS.find((u) => u.email === email)
  if (user && password === "demo123") {
    return user
  }
  return null
}
