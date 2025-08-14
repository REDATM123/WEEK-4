"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Calendar, Clock, TrendingUp, Eye, Send } from "lucide-react"

interface ReportFormData {
  client: string
  reportType: "monthly" | "weekly" | "incident"
  startDate: string
  endDate: string
  sendByEmail: boolean
}

interface ReportGenerationProps {
  onReportGenerated: (report: any) => void
}

export function ReportGeneration({ onReportGenerated }: ReportGenerationProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    client: "",
    reportType: "monthly",
    startDate: "",
    endDate: "",
    sendByEmail: false,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const clients = ["TechCorp SA", "SecureBank Ltd", "DataFlow Inc", "CyberShield Corp", "NetSecure Solutions"]

  const handleInputChange = (field: keyof ReportFormData, value: any) => {
    setFormData({ ...formData, [field]: value })
    setError("")
  }

  const handleSubmit = async () => {
    if (!formData.client) {
      setError("Veuillez sélectionner un client")
      return
    }

    if (!formData.startDate || !formData.endDate) {
      setError("Veuillez sélectionner les dates de début et de fin")
      return
    }

    setIsGenerating(true)
    setError("")

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newReport = {
      id: Date.now(),
      client: formData.client,
      type:
        formData.reportType === "monthly" ? "Mensuel" : formData.reportType === "weekly" ? "Hebdomadaire" : "Incident",
      status: "Terminé",
      date: new Date().toISOString().split("T")[0],
      startDate: formData.startDate,
      endDate: formData.endDate,
      emailSent: formData.sendByEmail,
    }

    onReportGenerated(newReport)
    setIsGenerating(false)

    // Reset form
    setFormData({
      client: "",
      reportType: "monthly",
      startDate: "",
      endDate: "",
      sendByEmail: false,
    })
  }

  const handlePreview = () => {
    if (!formData.client) {
      setError("Veuillez sélectionner un client pour l'aperçu")
      return
    }
    // In a real app, this would open a preview modal
    alert(`Aperçu du rapport ${formData.reportType} pour ${formData.client}`)
  }

  const getReportIcon = (type: string) => {
    switch (type) {
      case "monthly":
        return Calendar
      case "weekly":
        return Clock
      case "incident":
        return TrendingUp
      default:
        return FileText
    }
  }

  const getReportDescription = (type: string) => {
    switch (type) {
      case "monthly":
        return "Rapport complet des activités de sécurité du mois"
      case "weekly":
        return "Résumé hebdomadaire des incidents et alertes"
      case "incident":
        return "Rapport détaillé d'un incident spécifique"
      default:
        return "Rapport personnalisé"
    }
  }

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["monthly", "weekly", "incident"] as const).map((type) => {
          const Icon = getReportIcon(type)
          const isSelected = formData.reportType === type

          return (
            <Card
              key={type}
              className={`cursor-pointer transition-all ${
                isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleInputChange("reportType", type)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? "text-blue-600" : "text-gray-600"}`} />
                <h3 className="font-medium capitalize mb-1">
                  {type === "monthly" ? "Mensuel" : type === "weekly" ? "Hebdomadaire" : "Incident"}
                </h3>
                <p className="text-sm text-gray-500">{getReportDescription(type)}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration du Rapport</CardTitle>
          <CardDescription>Définissez les paramètres de génération du rapport</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type de Rapport</Label>
              <div className="p-2 bg-gray-50 rounded-md">
                <span className="text-sm font-medium capitalize">
                  {formData.reportType === "monthly"
                    ? "Mensuel"
                    : formData.reportType === "weekly"
                      ? "Hebdomadaire"
                      : "Incident"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de Début</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Date de Fin</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={formData.sendByEmail}
              onCheckedChange={(checked) => handleInputChange("sendByEmail", checked)}
            />
            <Label htmlFor="email" className="text-sm">
              Envoyer le rapport par email au client
            </Label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handlePreview} disabled={isGenerating}>
              <Eye className="h-4 w-4 mr-2" />
              Aperçu
            </Button>
            <Button onClick={handleSubmit} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Génération...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Générer le Rapport
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
