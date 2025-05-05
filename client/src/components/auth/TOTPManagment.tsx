"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/AuthContext"
import { TOTPSetup } from "./TOTPSetup"

export function TOTPManagement() {
  const [isSettingUp, setIsSettingUp] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const { user, disableTOTP } = useAuth()

  const handleDisable = async () => {
    setIsLoading(true)
    setError("")

    try {
      const success = await disableTOTP()

      if (!success) {
        setError("Impossibile disabilitare l'autenticazione a due fattori")
      }
    } catch (err) {
      setError("Si è verificato un errore")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetupComplete = () => {
    setIsSettingUp(false)
  }

  if (isSettingUp) {
    return <TOTPSetup onComplete={handleSetupComplete} onCancel={() => setIsSettingUp(false)} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Autenticazione a Due Fattori</CardTitle>
        <CardDescription>
          Aggiungi un ulteriore livello di sicurezza al tuo account richiedendo un codice di verifica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">App di Autenticazione</p>
            <p className="text-sm text-muted-foreground">
              Usa un'app di autenticazione per generare codici di verifica
            </p>
          </div>
          <Switch
            checked={user?.totpEnabled || false}
            disabled={isLoading}
            onCheckedChange={(checked) => {
              if (checked) {
                setIsSettingUp(true)
              } else {
                handleDisable()
              }
            }}
          />
        </div>

        {user?.totpEnabled && (
          <Alert>
            <AlertDescription>
              L'autenticazione a due fattori è attiva. Dovrai inserire un codice di verifica quando accedi.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {user?.totpEnabled && (
          <Button variant="outline" onClick={handleDisable} disabled={isLoading}>
            Disabilita Autenticazione a Due Fattori
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
