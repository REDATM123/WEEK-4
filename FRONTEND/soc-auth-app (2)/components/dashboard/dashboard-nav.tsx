"use client"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, History, Settings } from "lucide-react"

interface DashboardNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  const navItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: BarChart3 },
    { id: "generate", label: "Générer Rapport", icon: FileText },
    { id: "history", label: "Historique", icon: History },
    { id: "settings", label: "Paramètres", icon: Settings },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex gap-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            onClick={() => onTabChange(item.id)}
            className="flex items-center gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  )
}
