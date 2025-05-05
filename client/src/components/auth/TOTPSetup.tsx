"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/AuthContext"

interface TOTPSetupProps {
  onComplete?: () => void
  onCancel?: () => void
}

export function TOTPSetup({ onComplete, onCancel }: TOTPSetupProps) {
  const [qrCode, setQrCode] = useState<string>("")
  const [secret, setSecret] = useState<string>("")
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const { setupTOTP, verifyTOTPSetup } = useAuth()

  const handleSetup = async () => {
    setIsLoading(true)
    setError("")

    try {
      const result = await setupTOTP()

      if (result.success && result.qrCode && result.secret) {
        setQrCode(result.qrCode)
        setSecret(result.secret)
      } else {
        setError("Failed to generate TOTP setup")
      }
    } catch (err) {
      setError("An error occurred during setup")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await verifyTOTPSetup(verificationCode)

      if (success) {
        if (onComplete) {
          onComplete()
        }
      } else {
        setError("Invalid verification code")
      }
    } catch (err) {
      setError("An error occurred during verification")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configura l'Autenticazione a Due Fattori</CardTitle>
        <CardDescription>
          Scansiona il codice QR con la tua app di autenticazione per configurare l'autenticazione a due fattori
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!qrCode && !secret && (
          <div className="text-center">
            <Button onClick={handleSetup} disabled={isLoading}>
              {isLoading ? "Generazione..." : "Inizia configurazione"}
            </Button>
          </div>
        )}

        {qrCode && (
          <div className="flex flex-col items-center space-y-4">
            <div className="border p-4 rounded-md bg-white">
              <img src={qrCode || "/placeholder.svg"} alt="QR Code per configurazione TOTP" className="w-48 h-48" />
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Se non riesci a scansionare il codice QR, inserisci questo codice manualmente nella tua app:
              </p>
              <code className="bg-muted p-2 rounded text-sm font-mono">{secret}</code>
            </div>
          </div>
        )}

        {qrCode && (
          <div className="space-y-2">
            <label htmlFor="verification-code" className="text-sm font-medium">
              Codice di Verifica
            </label>
            <Input
              id="verification-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Inserisci codice a 6 cifre"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Annulla
          </Button>
        )}
        {qrCode && (
          <Button onClick={handleVerify} disabled={isLoading || verificationCode.length !== 6}>
            {isLoading ? "Verifica in corso..." : "Verifica e Attiva"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
