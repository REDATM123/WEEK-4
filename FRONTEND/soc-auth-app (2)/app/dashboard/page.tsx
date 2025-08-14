"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ReportGeneration } from "@/components/dashboard/report-generation"
import { ReportHistory } from "@/components/dashboard/report-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Activity, FileText, Calendar, Clock, Users, TrendingUp, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [reports, setReports] = useState([
    {
      id: 1,
      client: "TechCorp SA",
      type: "Mensuel",
      status: "Terminé",
      date: "2025-08-10",
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      emailSent: true,
    },
    {
      id: 2,
      client: "SecureBank Ltd",
      type: "Hebdomadaire",
      status: "En cours",
      date: "2025-08-09",
      startDate: "2025-08-02",
      endDate: "2025-08-08",
      emailSent: false,
    },
    {
      id: 3,
      client: "DataFlow Inc",
      type: "Incident",
      status: "Envoyé",
      date: "2025-08-08",
      startDate: "2025-08-07",
      endDate: "2025-08-07",
      emailSent: true,
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleReportGenerated = (newReport: any) => {
    setReports([newReport, ...reports])
    // Show success message and switch to history tab
    setTimeout(() => {
      setActiveTab("history")
    }, 1000)
  }

  const stats = [
    { title: "Incidents Actifs", value: "12", icon: AlertTriangle, color: "text-red-500" },
    { title: "Menaces Bloquées", value: "1,247", icon: Shield, color: "text-green-500" },
    { title: "Systèmes Surveillés", value: "89", icon: Activity, color: "text-blue-500" },
    { title: "Rapports Générés", value: reports.length.toString(), icon: FileText, color: "text-purple-500" },
  ]

  const recentIncidents = [
    { id: 1, type: "Critique", description: "Tentative d'intrusion détectée", time: "14:32", status: "En cours" },
    { id: 2, type: "Moyen", description: "Activité suspecte réseau", time: "13:45", status: "Résolu" },
    { id: 3, type: "Faible", description: "Mise à jour sécurité requise", time: "12:18", status: "Planifié" },
  ]

  const clients = [
    { name: "TechCorp SA", incidents: 3, status: "Actif" },
    { name: "SecureBank Ltd", incidents: 1, status: "Surveillé" },
    { name: "DataFlow Inc", incidents: 0, status: "Sécurisé" },
  ]

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Incidents Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          incident.type === "Critique"
                            ? "destructive"
                            : incident.type === "Moyen"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {incident.type}
                      </Badge>
                      <span className="text-sm text-gray-500">{incident.time}</span>
                    </div>
                    <p className="text-sm font-medium">{incident.description}</p>
                  </div>
                  <Badge variant="outline">{incident.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              État des Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.incidents} incidents actifs</p>
                  </div>
                  <Badge
                    variant={
                      client.status === "Sécurisé"
                        ? "default"
                        : client.status === "Surveillé"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {client.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Génération de Rapports
          </CardTitle>
          <CardDescription>Générez des rapports personnalisés pour vos clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
              onClick={() => setActiveTab("generate")}
            >
              <Calendar className="h-5 w-5" />
              <span>Rapport Mensuel</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
              onClick={() => setActiveTab("generate")}
            >
              <Clock className="h-5 w-5" />
              <span>Rapport Hebdomadaire</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
              onClick={() => setActiveTab("generate")}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Rapport d'Incident</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardContent()
      case "generate":
        return <ReportGeneration onReportGenerated={handleReportGenerated} />
      case "history":
        return <ReportHistory reports={reports} />
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
              <CardDescription>Configuration du système SOC</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Les paramètres système seront disponibles dans une version future.</p>
            </CardContent>
          </Card>
        )
      default:
        return renderDashboardContent()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeTab === "dashboard" && "Tableau de Bord"}
                  {activeTab === "generate" && "Génération de Rapports"}
                  {activeTab === "history" && "Historique des Rapports"}
                  {activeTab === "settings" && "Paramètres"}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Dernière mise à jour</p>
                <p className="text-lg font-semibold">{currentTime.toLocaleTimeString("fr-FR")}</p>
              </div>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}