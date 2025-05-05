"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/AuthContext"

interface TOTPVerifyProps {
  onVerified?: () => void
  onCancel?: () => void
}

export function TOTPVerify({ onVerified, onCancel }: TOTPVerifyProps) {
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const { verifyTOTP } = useAuth()

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Inserisci un codice valido a 6 cifre")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await verifyTOTP(verificationCode)

      if (success && onVerified) {
        onVerified()
      } else if (!success) {
        setError("Codice di verifica non valido")
      }
    } catch (err) {
      setError("Si è verificato un errore durante la verifica")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Autenticazione a Due Fattori</CardTitle>
        <CardDescription>Inserisci il codice di verifica dalla tua app di autenticazione</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
            autoFocus
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Annulla
          </Button>
        )}
        <Button onClick={handleVerify} disabled={isLoading || verificationCode.length !== 6}>
          {isLoading ? "Verifica in corso..." : "Verifica"}
        </Button>
      </CardFooter>
    </Card>
  )
}
