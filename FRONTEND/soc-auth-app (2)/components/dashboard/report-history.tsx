"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Eye, Mail, Search, Filter } from "lucide-react"
import { useState } from "react"

interface Report {
  id: number
  client: string
  type: string
  status: string
  date: string
  startDate?: string
  endDate?: string
  emailSent?: boolean
}

interface ReportHistoryProps {
  reports: Report[]
}

export function ReportHistory({ reports }: ReportHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "terminé":
        return "bg-green-100 text-green-800"
      case "en cours":
        return "bg-yellow-100 text-yellow-800"
      case "envoyé":
        return "bg-blue-100 text-blue-800"
      case "erreur":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (reportId: number) => {
    // In a real app, this would download the actual report file
    alert(`Téléchargement du rapport ${reportId}`)
  }

  const handlePreview = (reportId: number) => {
    // In a real app, this would open a preview modal
    alert(`Aperçu du rapport ${reportId}`)
  }

  const handleResendEmail = (reportId: number) => {
    // In a real app, this would resend the email
    alert(`Email renvoyé pour le rapport ${reportId}`)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Client ou type de rapport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Envoyé">Envoyé</SelectItem>
                  <SelectItem value="Erreur">Erreur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Mensuel">Mensuel</SelectItem>
                  <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                  <SelectItem value="Incident">Incident</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Rapports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun rapport trouvé avec les filtres actuels</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{report.client}</h4>
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)} variant="secondary">
                        {report.status}
                      </Badge>
                      {report.emailSent && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          <Mail className="h-3 w-3 mr-1" />
                          Email envoyé
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Généré le {report.date}</span>
                      {report.startDate && report.endDate && (
                        <span>
                          Période: {report.startDate} - {report.endDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handlePreview(report.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(report.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    {report.emailSent && (
                      <Button variant="ghost" size="sm" onClick={() => handleResendEmail(report.id)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
