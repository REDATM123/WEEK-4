"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertTriangle } from "lucide-react"

interface SessionTimeoutWarningProps {
  isOpen: boolean
  timeRemaining: number
  onExtendSession: () => void
  onLogout: () => void
}

export function SessionTimeoutWarning({
  isOpen,
  timeRemaining,
  onExtendSession,
  onLogout,
}: SessionTimeoutWarningProps) {
  const [countdown, setCountdown] = useState(timeRemaining)

  useEffect(() => {
    setCountdown(timeRemaining)
  }, [timeRemaining])

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1000) {
          onLogout()
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, onLogout])

  const minutes = Math.floor(countdown / 60000)
  const seconds = Math.floor((countdown % 60000) / 1000)
  const progressValue = (countdown / timeRemaining) * 100

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Session sur le point d'expirer
          </DialogTitle>
          <DialogDescription>
            Votre session va expirer dans {minutes}:{seconds.toString().padStart(2, "0")}. Voulez-vous prolonger votre
            session ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Temps restant</span>
          </div>
          <Progress value={progressValue} className="w-full" />
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onLogout}>
            Se déconnecter
          </Button>
          <Button onClick={onExtendSession}>Prolonger la session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
