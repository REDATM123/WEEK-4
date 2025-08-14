"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "analyst":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrateur"
      case "analyst":
        return "Analyste"
      case "viewer":
        return "Observateur"
      default:
        return role
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Centre Opérationnel de Sécurité</h1>
            <p className="text-sm text-gray-500">Surveillance et gestion des incidents</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <div className="flex items-center gap-2">
                <Badge className={getRoleColor(user?.role || "")} variant="secondary">
                  {getRoleLabel(user?.role || "")}
                </Badge>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  )
}
